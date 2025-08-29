import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import { useDeleteConcertMutation, useUpdateConcertMutation } from '@/app/redux/services/concertApi'
import { useAppDispatch } from '@/app/redux/store'
import React, { FC, MouseEvent, useState } from 'react'
import Switch from '@/app/forms/elements/Switch'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { ConcertProps, resetConcert } from '@/app/redux/features/concertSlice'
import { decreaseConcertsCount } from '@/app/redux/features/appSlice'

const AdminConcertRow: FC<{ concert: ConcertProps }> = ({ concert }) => {
  const dispatch = useAppDispatch()
  const [deleteConcert] = useDeleteConcertMutation()
  const [updateConcert] = useUpdateConcertMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [updating, setUpdating] = useState<Record<string, boolean>>({})

  const handleConcertDelete = async (e: MouseEvent, concertId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [concertId]: true }))

    try {
      await deleteConcert({ id: concertId, imageFilename: concert.imageFilename }).unwrap()

      dispatch(resetConcert())
      dispatch(decreaseConcertsCount())
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
        dispatch(setInputs({ formName: 'concert', data: { ...concert, isUpdating: true } }))
      }}
      className="grid grid-cols-[4fr_4fr_3fr_1fr] gap-x-4 h-14 bg-midnightblack hover:bg-inkblack rounded-[5px] py-2 pl-4 pr-2  border-l-4 border-l-pink-400 items-center cursor-pointer"
    >
      <div className="truncate">{concert?.name}</div>
      <div className="truncate">
        {concert?.eventDetails?.[0]?.date.split(' ')[0]}, {concert?.eventDetails?.[0]?.date?.split(' ')[2]}
      </div>
      <Switch
        enabled={concert.isOnSale}
        onChange={(e: any) => handleToggleConcertIsOnSale(e, concert?.id)}
        isLoading={updating[concert.id]}
        name="isOnSale"
        color="pink-400"
      />
      <div>
        <AdminTrashDeleteBtn loading={loading} id={concert.id} handleDelete={handleConcertDelete} />
      </div>
    </div>
  )
}

export default AdminConcertRow
