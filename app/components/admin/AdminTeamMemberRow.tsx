import React, { FC, MouseEvent, useState } from 'react'
import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { resetTeamMember, TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { useDeleteTeamMemberMutation } from '@/app/redux/services/teamMemberApi'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'
import { setTeamMembersCount } from '@/app/redux/features/appSlice'

const AdminTeamMemberRow: FC<{ teamMember: TeamMemberProps }> = ({ teamMember }) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('teamMember', dispatch)
  const [deleteTeamMember] = useDeleteTeamMemberMutation()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const { teamMembersCount } = useAppSelector((state: RootState) => state.app)

  const handleTeamMemberDelete = async (e: MouseEvent, teamMemberId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [teamMemberId]: true }))

    try {
      await deleteTeamMember({ id: teamMemberId, imageFilename: teamMember?.imageFilename }).unwrap()

      dispatch(resetTeamMember())
      dispatch(setTeamMembersCount(teamMembersCount - 1))
    } catch {}

    setLoading((prev) => ({ ...prev, [teamMemberId]: false }))
  }

  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(teamMember)
      }}
      className="grid grid-cols-12 h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-purple-500 items-center duration-200 cursor-pointer"
    >
      <div className="col-span-3 truncate">{teamMember?.firstName}</div>
      <div className="col-span-3 truncate">{teamMember?.lastName}</div>
      <div className="col-span-3 truncate">{teamMember?.position}</div>
      <div className="col-span-2 truncate">{teamMember?.role}</div>
      <div className="col-span-1 truncate">
        <AdminTrashDeleteBtn loading={loading} id={teamMember?.id} handleDelete={handleTeamMemberDelete} />
      </div>
    </div>
  )
}

export default AdminTeamMemberRow
