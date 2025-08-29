import React, { FormEvent, useState } from 'react'
import ConcertForm from '../forms/ConcertForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { resetConcert } from '../redux/features/concertSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { useCreateConcertMutation, useUpdateConcertMutation } from '../redux/services/concertApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateConcertForm from '../validations/validateConcertForm'
import deleteFileFromFirebase from '../utils/firebase.delete'
import { increaseConcertsCount } from '../redux/features/appSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { drawerVariants } from '../lib/constants/motion'

const AdminConcertDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer } = useAppSelector((state: RootState) => state.dashboard)
  const { concert } = useAppSelector((state: RootState) => state.form)
  const [createConcert, { isLoading: isCreating }] = useCreateConcertMutation()
  const [updateConcert, { isLoading: isUpdating }] = useUpdateConcertMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress, setErrors, handleInput, handleFileChange, removeConcertDetails } = createFormActions(
    'concert',
    dispatch
  )
  const isLoading = isUpdating || isCreating || loading
  const isUpdateMode = concert?.inputs?.isUpdating

  const prepareConcertData = (uploadedImageURL: string) => ({
    name: concert.inputs.name,
    pressRelease: concert.inputs.pressRelease,
    description: concert.inputs.description,
    eventDetails: concert.inputs.eventDetails,
    imageUrl: uploadedImageURL || concert?.inputs?.imageUrl,
    imageFilename: concert.inputs?.file?.name || concert.inputs?.imageFilename,
    type: concert.inputs.type,
    cardDate: concert.inputs.cardDate,
    allSeriesExternalLink: concert.inputs.allSeriesExternalLink
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateConcertForm(concert?.inputs, setErrors)
    if (!isValid) return

    try {
      setLoading(true)
      let uploadedImageURL = ''

      if (concert?.inputs?.file) {
        try {
          uploadedImageURL = await uploadFileToFirebase(concert.inputs.file, handleUploadProgress, 'image')
        } catch (uploadError) {
          console.log('Upload failed:', uploadError)
          return
        }
      }

      try {
        const concertData = prepareConcertData(uploadedImageURL)

        if (isUpdateMode) {
          await updateConcert({
            id: concert.inputs.id,
            ...concertData
          }).unwrap()
        } else {
          await createConcert(concertData).unwrap()
          dispatch(increaseConcertsCount())
        }
      } catch (apiError) {
        console.log('API call failed:', apiError)
      }
    } catch {
      if (concert.inputs.file) {
        await deleteFileFromFirebase(concert.inputs.file.name, 'image')
      }
    } finally {
      reset()
      setLoading(false)
    }
  }

  const reset = () => {
    dispatch(resetConcert())
    dispatch(resetForm('concert'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <AnimatePresence>
      {drawer && (
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
          className="h-dvh w-full fixed top-0 left-0 z-50 bg-inkblack overflow-y-auto"
        >
          <ConcertForm
            inputs={concert?.inputs}
            errors={concert?.errors}
            handleInput={handleInput}
            handleFileChange={handleFileChange}
            removeConcertDetails={removeConcertDetails}
            handleSubmit={handleSubmit}
            loading={isLoading}
            isUpdating={isUpdateMode}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdminConcertDrawer
