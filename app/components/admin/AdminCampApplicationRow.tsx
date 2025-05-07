import React, { useState } from 'react'
import { openViewDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { resetCampApplication } from '@/app/redux/features/campSlice'
import { decreaseCampApplicationsCount } from '@/app/redux/features/appSlice'
import { useDeleteCampApplicationMutation } from '@/app/redux/services/campApi'

const AdminCampApplicationRow = ({ application }: any) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('campApplication', dispatch)
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteCampApplication] = useDeleteCampApplicationMutation()

  const handleCampApplicationDelete = async (e: MouseEvent, campApplicationId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [campApplicationId]: true }))

    try {
      await deleteCampApplication({ campApplicationId }).unwrap()

      dispatch(resetCampApplication())
      dispatch(decreaseCampApplicationsCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [campApplicationId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openViewDrawer())
        setInputs(application)
      }}
      className="grid grid-cols-[3fr_3fr_2fr_2fr_2fr] gap-x-4 h-14 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-blue-400 items-center cursor-pointer text-white overflow-x-auto"
    >
      <div className="truncate">{application?.student?.firstName}</div>
      <div className="truncate">{application?.student?.lastName}</div>
      <div className="truncate">{application?.student?.studentPhoneNumber}</div>
      <div className="truncate">{formatDate(application?.createdAt)}</div>
      <div>
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
