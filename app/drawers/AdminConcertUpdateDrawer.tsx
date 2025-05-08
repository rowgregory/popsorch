import React, { FormEvent, useState } from 'react'
import ConcertForm from '../forms/ConcertForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import BottomDrawer from '../components/common/BottomDrawer'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { resetConcert } from '../redux/features/concertSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import { useUpdateConcertMutation } from '../redux/services/concertApi'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import validateConcertForm from '../validations/validateConcertForm'

const AdminConcertUpdateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const { concert } = useAppSelector((state: RootState) => state.form)
  const [updateConcert] = useUpdateConcertMutation()
  const [loading, setLoading] = useState(false)
  const { handleUploadProgress, setErrors } = createFormActions('concert', dispatch)

  const handleUpdateConcert = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateConcertForm(concert?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      let imageUrl
      if (concert?.inputs?.file) {
        imageUrl = await uploadFileToFirebase(concert.inputs.file, handleUploadProgress, 'image')
      }

      await updateConcert({
        id: concert.inputs.id,
        name: concert.inputs.name,
        pressRelease: concert.inputs.pressRelease,
        description: concert.inputs.description,
        eventDetails: concert.inputs.eventDetails,
        imageFilename: concert.inputs?.file?.name ?? concert.inputs.imageFilename,
        imageUrl: imageUrl ?? concert.inputs.imageUrl,
        type: concert.inputs.type,
        allSeriesExternalLink: concert.inputs.allSeriesExternalLink,
        cardDate: concert.inputs.cardDate
      }).unwrap()

      reset()
    } catch {}

    setLoading(false)
  }

  const reset = () => {
    dispatch(resetConcert())
    dispatch(resetForm('concert'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <BottomDrawer isOpen={drawer && isUpdating} onClose={reset}>
      <ConcertForm handleSubmit={handleUpdateConcert} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminConcertUpdateDrawer
