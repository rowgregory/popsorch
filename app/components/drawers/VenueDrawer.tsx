import { useState } from 'react'
import { useAppDispatch, useFormSelector, useVenueSelector } from '@/app/redux/store'
import { setCloseVenueDrawer } from '@/app/redux/features/venueSlice'
import { createFormActions, resetForm } from '@/app/redux/features/formSlice'
import VenueForm from '@/app/components/forms/VenueForm'
import uploadFileToFirebase from '@/app/utils/firebase.upload'
import validateVenueForm from '@/app/lib/validations/validateVenueForm'
import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import getCoordinatesFromAddress from '@/app/utils/getCoordinatesFromAddress'
import { showToast } from '@/app/redux/features/toastSlice'
import { useRouter } from 'next/navigation'
import { updateVenue } from '@/app/actions/updateVenue'
import { createVenue } from '@/app/actions/createVenue'

const VenueDrawer = () => {
  const dispatch = useAppDispatch()
  const { venueDrawer } = useVenueSelector()
  const { venueForm } = useFormSelector()
  const { handleInput, setErrors, handleUploadProgress } = createFormActions('venueForm', dispatch)
  const router = useRouter()
  const inputs = venueForm?.inputs
  const errors = venueForm?.errors
  const isUpdateMode = inputs?.isUpdating
  const [loading, setLoading] = useState(false)

  const prepareVenueData = (coordinates: any, uploadedImageURL: string) => ({
    name: inputs?.name,
    capacity: inputs?.capacity,
    accessibility: inputs?.accessibility,
    immersiveEnvironment: inputs?.immersiveEnvironment,
    parking: inputs?.parking,
    address: inputs?.address,
    latitude: String(coordinates.lat),
    longitude: String(coordinates.lng),
    imageUrl: uploadedImageURL || inputs?.imageUrl,
    imageFilename: inputs?.file?.name || inputs?.imageFilename
  })

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!validateVenueForm(inputs, setErrors)) return

    setLoading(true)
    let uploadedImageURL = ''

    try {
      // Get coordinates from address
      let coordinates: { lat: number; lng: number }
      try {
        coordinates = await getCoordinatesFromAddress(inputs?.address)
      } catch (error) {
        throw new Error(error?.message || 'Failed to calculate coordinates from address')
      }

      // Upload image if provided
      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : 'Failed to upload image')
        }
      }

      // Prepare and save venue data
      const venueData = prepareVenueData(coordinates, uploadedImageURL)

      if (isUpdateMode) {
        await updateVenue(inputs.id, venueData)
      } else {
        await createVenue(venueData)
      }

      dispatch(
        showToast({
          type: 'success',
          message: `Venue ${isUpdateMode ? 'updated' : 'created'} successfully!`
        })
      )

      router.refresh()
      reset()
    } catch (error) {
      // Delete uploaded image on failure
      if (uploadedImageURL) {
        await deleteFileFromFirebase(inputs?.file?.name, 'image')
      }

      dispatch(
        showToast({
          type: 'error',
          message: error instanceof Error ? error.message : 'An unexpected error occurred'
        })
      )
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(setCloseVenueDrawer())
    dispatch(resetForm('venueForm'))
  }

  return (
    <AnimatePresence>
      {venueDrawer && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={reset}
          />
          <motion.div
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto">
              <VenueForm
                inputs={inputs}
                errors={errors}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                isUpdating={isUpdateMode}
                close={reset}
                loading={loading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VenueDrawer
