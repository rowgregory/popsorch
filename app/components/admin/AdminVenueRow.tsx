import { createFormActions } from '@/app/redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import React, { FC, MouseEvent, useState } from 'react'
import { useDeleteVenueMutation, useFetchVenuesQuery } from '@/app/redux/services/venueApi'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { VenueProps } from '@/app/types/model.types'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { setVenuesCount } from '@/app/redux/features/appSlice'

const AdminVenueRow: FC<{ venue: VenueProps }> = ({ venue }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const { setInputs } = createFormActions('venue', dispatch)
  const [deleteVenue] = useDeleteVenueMutation()
  const { success } = useAppSelector((state: RootState) => state.venue)
  const { venuesCount } = useAppSelector((state: RootState) => state.app)
  useFetchVenuesQuery(undefined, { skip: !success })

  const handleVenueDelete = async (e: MouseEvent, venueId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [venueId]: true }))

    try {
      await deleteVenue({ id: venueId, imageFilename: venue.imageFilename }).unwrap()

      dispatch(setVenuesCount(venuesCount - 1))
    } catch {}

    setLoading((prev) => ({ ...prev, [venueId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(venue)
      }}
      className="grid grid-cols-12 h-14 gap-x-7 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-yellow-400 items-center cursor-pointer"
    >
      <div className="col-span-2 truncate">{venue?.name}</div>
      <div className="col-span-1 truncate">{venue?.capacity}</div>
      <div className="col-span-3 truncate">{venue?.accessibility}</div>
      <div className="col-span-3 truncate">{venue?.immersiveEnvironment}</div>
      <div className="col-span-2 truncate">{venue?.parking}</div>
      <div className="col-span-1">
        <AdminTrashDeleteBtn loading={loading} id={venue?.id} handleDelete={handleVenueDelete} />
      </div>
    </div>
  )
}

export default AdminVenueRow
