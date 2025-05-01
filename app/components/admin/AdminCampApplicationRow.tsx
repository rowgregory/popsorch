import React, { useState } from 'react'
import { openViewDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { resetCampApplication } from '@/app/redux/features/campSlice'
import { setCampApplicationsCount } from '@/app/redux/features/appSlice'
import { useDeleteCampApplicationMutation, useFetchCampApplicationsQuery } from '@/app/redux/services/campApi'

const AdminCampApplicationRow = ({ application }: any) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('campApplication', dispatch)
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteCampApplication] = useDeleteCampApplicationMutation()
  const { campApplicationCount } = useAppSelector((state: RootState) => state.app)
  const { success } = useAppSelector((state: RootState) => state.camp)
  useFetchCampApplicationsQuery(undefined, { skip: !success })

  const handleCampApplicationDelete = async (e: MouseEvent, campApplicationId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [campApplicationId]: true }))

    try {
      await deleteCampApplication({ campApplicationId }).unwrap()

      dispatch(resetCampApplication())
      dispatch(setCampApplicationsCount(campApplicationCount - 1))
    } catch {}

    setLoading((prev) => ({ ...prev, [campApplicationId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openViewDrawer())
        setInputs(application)
      }}
      className="grid grid-cols-[1.5fr_1.5fr_3fr_2fr_2fr_auto] gap-x-4 h-14 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-blue-400 items-center cursor-pointer text-white overflow-x-auto"
    >
      <div className="min-w-[120px] truncate">{application?.student?.firstName}</div>
      <div className="min-w-[120px] truncate">{application?.student?.lastName}</div>
      <div className="min-w-[200px] truncate">{application?.student?.studentEmailAddress}</div>
      <div className="min-w-[160px] truncate">{application?.student?.studentPhoneNumber}</div>
      <div className="min-w-[140px] truncate">{formatDate(application?.createdAt)}</div>
      <div className="min-w-[80px]">
        <AdminTrashDeleteBtn
          loading={loading}
          id={application.id}
          handleDelete={(e: any) => handleCampApplicationDelete(e, application.id)}
        />
      </div>
    </div>
  )
}

export default AdminCampApplicationRow
