import { createFormActions } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import React, { FC, MouseEvent, useState } from 'react'
import { useDeleteVenueMutation } from '@/app/redux/services/venueApi'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { VenueProps } from '@/app/types/model.types'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { decreaseVenuesCount } from '@/app/redux/features/appSlice'
import { resetVenue } from '@/app/redux/features/venueSlice'

const AdminVenueRow: FC<{ venue: VenueProps }> = ({ venue }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const { setInputs } = createFormActions('venue', dispatch)
  const [deleteVenue] = useDeleteVenueMutation()

  const handleVenueDelete = async (e: MouseEvent, venueId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [venueId]: true }))

    try {
      await deleteVenue({ id: venueId, imageFilename: venue.imageFilename }).unwrap()

      dispatch(resetVenue())
      dispatch(decreaseVenuesCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [venueId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(venue)
      }}
      className="grid grid-cols-[3fr_3fr_3fr_3fr] h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-yellow-400 items-center cursor-pointer"
    >
      <div className="truncate">{venue?.name}</div>
      <div className="truncate">{venue?.capacity}</div>
      <div className="truncate">{venue?.accessibility}</div>
      <div>
        <AdminTrashDeleteBtn loading={loading} id={venue?.id} handleDelete={handleVenueDelete} />
      </div>
    </div>
  )
}

export default AdminVenueRow
