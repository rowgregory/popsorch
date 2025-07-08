import React, { FormEvent, useState } from 'react'
import ConcertForm from '../forms/ConcertForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import BottomDrawer from '../components/common/BottomDrawer'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { resetConcert } from '../redux/features/concertSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { useCreateConcertMutation } from '../redux/services/concertApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateConcertForm from '../validations/validateConcertForm'
import deleteFileFromFirebase from '../utils/firebase.delete'
import { increaseConcertsCount } from '../redux/features/appSlice'

const AdminConcertCreateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { concert } = useAppSelector((state: RootState) => state.form)
  const [createConcert] = useCreateConcertMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress, setErrors } = createFormActions('concert', dispatch)

  const handleCreateConcert = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateConcertForm(concert?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      const uploadedImageURL = await uploadFileToFirebase(concert.inputs.file, handleUploadProgress, 'image')

      await createConcert({
        name: concert.inputs.name,
        pressRelease: concert.inputs.pressRelease,
        description: concert.inputs.description,
        eventDetails: concert.inputs.eventDetails,
        imageFilename: concert.inputs.file.name,
        imageUrl: uploadedImageURL,
        type: concert.inputs.type,
        allSeriesExternalLink: concert.inputs.allSeriesExternalLink
      }).unwrap()

      reset()
      dispatch(increaseConcertsCount())
    } catch {
      if (concert.inputs.file) {
        await deleteFileFromFirebase(concert.inputs.file.name, 'image')
      }
    }

    setLoading(false)
  }

  const reset = () => {
    dispatch(resetConcert())
    dispatch(resetForm('concert'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <BottomDrawer isOpen={drawer && !isUpdating} onClose={reset}>
      <ConcertForm handleSubmit={handleCreateConcert} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminConcertCreateDrawer
