import React from 'react'
import { openViewDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'

const AdminCampApplicationRow = ({ application }: any) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('campApplication', dispatch)

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
    </div>
  )
}

export default AdminCampApplicationRow
