import React, { FormEvent, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import BottomDrawer from '../components/common/BottomDrawer'
import { closeDrawer } from '../redux/features/dashboardSlice'
import { resetVenue } from '../redux/features/venueSlice'
import { createFormActions, resetForm, setIsNotCreating } from '../redux/features/formSlice'
import VenueForm from '../forms/VenueForm'
import { useUpdateVenueMutation } from '../redux/services/venueApi'
import uploadFileToFirebase from '../utils/firebase.upload'
import validateVenueForm from '../validations/validateVenueForm'
import getCoordinatesFromAddress from '../utils/getCoordinatesFromAddress'

const AdminVenueUpdateDrawer = () => {
  const dispatch = useAppDispatch()
  const { drawer, isUpdating } = useAppSelector((state: RootState) => state.dashboard)
  const [updateVenue] = useUpdateVenueMutation()
  const { venue } = useAppSelector((state: RootState) => state.form)
  const { setErrors, handleUploadProgress } = createFormActions('venue', dispatch)
  const [loading, setLoading] = useState(false)

  const handleUpdateVenue = async (e: FormEvent) => {
    e.preventDefault()

    const isValid = validateVenueForm(venue?.inputs, setErrors)
    if (!isValid) return

    setLoading(true)

    try {
      let imageUrl
      if (venue?.inputs?.file) {
        imageUrl = await uploadFileToFirebase(venue.inputs.file, handleUploadProgress, 'image')
      }

      const coordinates = await getCoordinatesFromAddress(venue.inputs.address)
      if (!coordinates) {
        setErrors({ address: 'Unable to get location from address.' })
        setLoading(false)
        return
      }

      await updateVenue({
        id: venue.inputs.id,
        name: venue.inputs.name,
        capacity: venue.inputs.capacity,
        accessibility: venue.inputs.accessibility,
        immersiveEnvironment: venue.inputs.immersiveEnvironment,
        parking: venue.inputs.parking,
        ...(venue.inputs?.file && {
          imageFilename: venue.inputs.file.name,
          imageToDeleteFilename: venue.inputs.imageFilename,
          imageUrl
        }),
        address: venue.inputs.address,
        latitude: String(coordinates.lat),
        longitude: String(coordinates.lng)
      }).unwrap()

      reset()
    } catch {}

    setLoading(false)
  }

  const reset = () => {
    dispatch(resetVenue())
    dispatch(resetForm('venue'))
    dispatch(closeDrawer())
    dispatch(setIsNotCreating())
  }

  return (
    <BottomDrawer isOpen={drawer && isUpdating} onClose={reset}>
      <VenueForm handleSubmit={handleUpdateVenue} loading={loading} />
    </BottomDrawer>
  )
}

export default AdminVenueUpdateDrawer
