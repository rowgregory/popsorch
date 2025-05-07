import React, { FC, MouseEvent, useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { resetTeamMember, TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import { useDeleteTeamMemberMutation } from '@/app/redux/services/teamMemberApi'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { decreaseTeamMembersCount } from '@/app/redux/features/appSlice'

const AdminTeamMemberRow: FC<{ teamMember: TeamMemberProps }> = ({ teamMember }) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('teamMember', dispatch)
  const [deleteTeamMember] = useDeleteTeamMemberMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleTeamMemberDelete = async (e: MouseEvent, teamMemberId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [teamMemberId]: true }))

    try {
      await deleteTeamMember({ id: teamMemberId, imageFilename: teamMember?.imageFilename }).unwrap()

      dispatch(resetTeamMember())
      dispatch(decreaseTeamMembersCount())
    } catch {}

    setLoading((prev) => ({ ...prev, [teamMemberId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(teamMember)
      }}
      className="grid grid-cols-[3fr_3fr_3fr_2fr_1fr] h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-purple-500 items-center duration-200 cursor-pointer"
    >
      <div className="truncate">{teamMember?.firstName}</div>
      <div className="truncate">{teamMember?.lastName}</div>
      <div className="truncate">{teamMember?.position}</div>
      <div className="truncate">{teamMember?.role}</div>
      <div className="truncate">
        <AdminTrashDeleteBtn loading={loading} id={teamMember?.id} handleDelete={handleTeamMemberDelete} />
      </div>
    </div>
  )
}

export default AdminTeamMemberRow
