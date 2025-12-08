import React, { FormEvent } from 'react'
import { useAppDispatch, useFormSelector, useVenueSelector } from '../redux/store'
import { addVenueToState, setCloseVenueDrawer, updateVenueInState } from '../redux/features/venueSlice'
import { createFormActions, resetForm } from '../redux/features/formSlice'
import VenueForm from '../forms/VenueForm'
import { useCreateVenueMutation, useUpdateVenueMutation } from '../redux/services/venueApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateVenueForm from '../validations/validateVenueForm'
import deleteFileFromFirebase from '../utils/firebase.delete'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import getCoordinatesFromAddress from '../utils/getCoordinatesFromAddress'
import { showToast } from '../redux/features/toastSlice'

const VenueDrawer = () => {
  const dispatch = useAppDispatch()
  const { venueDrawer } = useVenueSelector()
  const { venueForm } = useFormSelector()
  const { handleInput, setErrors, handleUploadProgress, setSubmitted } = createFormActions('venueForm', dispatch)
  const [createVenue, { isLoading: isCreating }] = useCreateVenueMutation()
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation()

  const inputs = venueForm?.inputs
  const errors = venueForm?.errors

  const isLoading = isUpdating || isCreating || venueForm.submitted
  const isUpdateMode = inputs?.isUpdating

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateVenueForm(inputs, setErrors)) return

    try {
      setSubmitted(true)
      let coordinates: any
      let uploadedImageURL = ''
      try {
        coordinates = await getCoordinatesFromAddress(inputs?.address)
      } catch (error: any) {
        setSubmitted(false)
        dispatch(
          showToast({
            type: 'error',
            message: 'Failed to calculcate coordiates from address',
            description: error
          })
        )
        return
      }

      if (inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')
        } catch (error: any) {
          dispatch(
            showToast({
              type: 'error',
              description: 'Failed to upload image to Firebase',
              message: error?.data?.message
            })
          )
          return
        }
      }

      try {
        const venueData = prepareVenueData(coordinates, uploadedImageURL)

        if (isUpdateMode) {
          const response = await updateVenue({ id: inputs.id, ...venueData }).unwrap()
          dispatch(updateVenueInState(response.venue))
        } else {
          const response = await createVenue(venueData).unwrap()
          dispatch(addVenueToState(response.venue))
        }

        dispatch(
          showToast({
            type: 'success',
            description: 'Success',
            message: `${isUpdateMode ? 'Updated' : 'Created'} the venue successfully`
          })
        )
        reset()
      } catch (apiError: any) {
        dispatch(showToast({ type: 'error', description: 'Failed', message: apiError?.data?.message }))
        setSubmitted(false)
      }
    } catch {
      if (inputs.file) {
        await deleteFileFromFirebase(inputs.file.name, 'image')
      }
    }
  }

  const reset = () => {
    dispatch(setCloseVenueDrawer())
    dispatch(resetForm('venueForm'))
    setSubmitted(false)
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
                loading={isLoading}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VenueDrawer
