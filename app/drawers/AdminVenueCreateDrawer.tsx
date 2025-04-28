import React, { FormEvent, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import BottomDrawer from '../components/common/BottomDrawer'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { resetVenue } from '../redux/features/venueSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import VenueForm from '../forms/VenueForm'
import { useCreateVenueMutation, useFetchVenuesQuery } from '../redux/services/venueApi'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'
import validateVenueForm from '../validations/validateVenueForm'
import deleteFileFromFirebase from '../utils/deleteFileFromFirebase'
import { setVenuesCount } from '../redux/features/appSlice'

const AdminVenueCreateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const [createVenue] = useCreateVenueMutation()
  const { venue } = useAppSelector((state: RootState) => state.form)
  const { setErrors, handleUploadProgress } = createFormActions('venue', dispatch)
  const [loading, setLoading] = useState(false)
  const { success } = useAppSelector((state: RootState) => state.venue)
  const { venuesCount } = useAppSelector((state: RootState) => state.app)
  useFetchVenuesQuery(undefined, { skip: !success })

  const handleCreateVenue = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateVenueForm(venue?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    const imageUrl = await uploadFileToFirebase(venue.inputs.file, handleUploadProgress, 'image')

    try {
      await createVenue({
        name: venue.inputs.name,
        capacity: venue.inputs.capacity,
        accessibility: venue.inputs.accessibility,
        immersiveEnvironment: venue.inputs.immersiveEnvironment,
        parking: venue.inputs.parking,
        imageFilename: venue.inputs.file.name,
        imageUrl,
        address: venue.inputs.address
      }).unwrap()

      reset()
      dispatch(setVenuesCount(venuesCount + 1))
    } catch {
      if (venue.inputs.file) {
        await deleteFileFromFirebase(venue.inputs.file.name, 'image')
      }
    }

    setLoading(false)
  }

  const reset = () => {
    dispatch(resetVenue())
    dispatch(resetForm('venue'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <BottomDrawer isOpen={drawer && !isUpdating} onClose={reset}>
      <VenueForm handleSubmit={handleCreateVenue} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminVenueCreateDrawer
