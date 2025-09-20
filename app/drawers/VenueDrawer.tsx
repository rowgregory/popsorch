import React, { FormEvent } from 'react'
import { useAppDispatch, useFormSelector, useVenueSelector } from '../redux/store'
import { setCloseVenueDrawer } from '../redux/features/venueSlice'
import { clearErrors, clearInputs, createFormActions } from '../redux/features/formSlice'
import VenueForm from '../forms/VenueForm'
import { useCreateVenueMutation, useUpdateVenueMutation } from '../redux/services/venueApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateVenueForm from '../validations/validateVenueForm'
import deleteFileFromFirebase from '../utils/firebase.delete'
import getTypeFromFile from '../lib/utils/getTypeFromFile'
import { AnimatePresence, motion } from 'framer-motion'
import { backdropVariants, drawerVariants } from '../lib/constants/motion'
import getCoordinatesFromAddress from '../utils/getCoordinatesFromAddress'
import { showToast } from '../redux/features/toastSlice'

const VenueDrawer = () => {
  const dispatch = useAppDispatch()
  const { venueDrawer } = useVenueSelector()
  const { venueForm, submitting } = useFormSelector()
  const { handleInput, setErrors, handleUploadProgress, setSubmitted } = createFormActions('venueForm', dispatch)
  const [createVenue, { isLoading: isCreating }] = useCreateVenueMutation()
  const [updateVenue, { isLoading: isUpdating }] = useUpdateVenueMutation()

  const inputs = venueForm?.inputs
  const errors = venueForm?.errors

  const isLoading = isUpdating || isCreating || submitting
  const isUpdateMode = inputs?.isUpdating

  const prepareVenueData = (coordinates: any) => ({
    name: inputs?.name,
    capacity: inputs?.capacity,
    accessibility: inputs?.accessibility,
    immersiveEnvironment: inputs?.immersiveEnvironment,
    parking: inputs?.parking,
    address: inputs?.address,
    latitude: String(coordinates.lat),
    longitude: String(coordinates.lng)
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (!validateVenueForm(inputs, setErrors)) {
      setSubmitted(false)
      return
    }

    try {
      let coordinates: any

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

      const venueData = prepareVenueData(coordinates)

      let newFilePath = null

      if (isUpdateMode) {
        const fileToDelete = inputs.imageFilenameToDelete

        const fileType = getTypeFromFile(fileToDelete)

        if (inputs.file) {
          await deleteFileFromFirebase(fileToDelete, fileType)

          newFilePath = await uploadFileToFirebase(inputs.file, handleUploadProgress, getTypeFromFile(inputs.file.name))
        }
      } else if (inputs.file) {
        newFilePath = await uploadFileToFirebase(inputs.file, handleUploadProgress, getTypeFromFile(inputs.file.name))
      }

      const finalVenueData = {
        ...venueData,
        ...(newFilePath && { imageUrl: newFilePath, imageFilename: inputs.file.name })
      }

      if (isUpdateMode) {
        await updateVenue({
          id: inputs.id,
          ...finalVenueData
        }).unwrap()
      } else {
        await createVenue(finalVenueData).unwrap()
      }

      dispatch(
        showToast({
          type: 'success',
          message: `${isUpdating ? 'Update' : 'Create'} Success`,
          description: `Venue has been successfully ${isUpdating ? 'updated' : 'created'}`
        })
      )

      closeDrawer()
    } catch (error: any) {
      dispatch(
        showToast({
          type: 'error',
          message: `${isUpdating ? 'Update' : 'Create'} Failed`,
          description: error
        })
      )
    } finally {
      setSubmitted(false)
    }
  }

  const closeDrawer = () => {
    dispatch(setCloseVenueDrawer())
    dispatch(clearErrors({ formName: 'venueForm' }))
    dispatch(clearInputs({ formName: 'venueForm' }))
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
            onClick={closeDrawer}
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
            className="min-h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-50 bg-white shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col"
          >
            <VenueForm
              inputs={inputs}
              errors={errors}
              handleInput={handleInput}
              close={closeDrawer}
              handleSubmit={handleSubmit}
              loading={isLoading}
              isUpdating={isUpdateMode}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VenueDrawer
