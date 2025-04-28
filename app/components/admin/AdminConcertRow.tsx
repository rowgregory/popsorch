import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import {
  useDeleteConcertMutation,
  useFetchConcertsQuery,
  useUpdateConcertMutation
} from '@/app/redux/services/concertApi'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import React, { MouseEvent, useState } from 'react'
import Switch from '@/app/forms/elements/Switch'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { resetConcert } from '@/app/redux/features/concertSlice'
import { setConcertsCount } from '@/app/redux/features/appSlice'

const AdminConcertRow = ({ concert }: any) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('concert', dispatch)
  const [deleteConcert] = useDeleteConcertMutation()
  const [updateConcert] = useUpdateConcertMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [updating, setUpdating] = useState<Record<string, boolean>>({})
  const { success } = useAppSelector((state: RootState) => state.concert)
  const { concertsCount } = useAppSelector((state: RootState) => state.app)
  useFetchConcertsQuery(success, { skip: success })

  const handleConcertDelete = async (e: MouseEvent, concertId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [concertId]: true }))

    try {
      await deleteConcert({ id: concertId, imageFilename: concert.imageFilename }).unwrap()

      dispatch(resetConcert())
      dispatch(setConcertsCount(concertsCount - 1))
    } catch {}

    setLoading((prev) => ({ ...prev, [concertId]: false }))
  }

  const handleToggleConcertIsOnSale = async (e: any, concertId: string) => {
    e.preventDefault()
    setUpdating((prev) => ({ ...prev, [concertId]: true }))

    try {
      await updateConcert({ id: concertId, isOnSale: e.target.checked }).unwrap()

      dispatch(resetConcert())
    } catch {}

    setUpdating((prev) => ({ ...prev, [concertId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(concert)
      }}
      className="grid grid-cols-[3fr_7fr_2fr_2fr_auto] gap-x-14 h-14 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-pink-400 items-center cursor-pointer min-w-[700px]"
    >
      <div className="min-w-[200px] truncate">{concert?.name}</div>
      <div className="min-w-[280px] truncate">{concert?.description}</div>
      <div className="min-w-[120px] truncate">
        {concert?.eventDetails?.[0]?.date.split(' ')[0]}, {concert?.eventDetails?.[0]?.date?.split(' ')[2]}
      </div>
      <Switch
        enabled={concert.isOnSale}
        onChange={(e: any) => handleToggleConcertIsOnSale(e, concert?.id)}
        isLoading={updating[concert.id]}
        name="isOnSale"
        color="pink-400"
      />
      <div className="min-w-[40px] truncate">
        <AdminTrashDeleteBtn loading={loading} id={concert.id} handleDelete={handleConcertDelete} />
      </div>
    </div>
  )
}

export default AdminConcertRow
