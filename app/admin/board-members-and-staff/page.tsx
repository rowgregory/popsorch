'use client'

import React from 'react'
import AdminTeamMemberRow from '@/app/components/admin/AdminTeamMemberRow'
import CreateBtn from '@/app/components/admin/CreateBtn'
import AdminTeamMemberCreateDrawer from '@/app/drawers/AdminTeamMemberCreateDrawer'
import AdminTeamMemberUpdateDrawer from '@/app/drawers/AdminTeamMemberUpdateDrawer'
import { openCreateDrawer } from '@/app/redux/features/dashboardSlice'
import { resetTeamMemberError, TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'

const BoardMembersAndStaff = () => {
  const { teamMembers, error, teamMembersCount, noTeamMembers } = useAppSelector((state: RootState) => state.teamMember)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="relative">
      <AdminTeamMemberCreateDrawer />
      <AdminTeamMemberUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetTeamMemberError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Board Members & Staff"
          total={teamMembersCount}
          bgcolor="bg-purple-500"
          textcolor="text-purple-500"
        />
        <CreateBtn
          btnText="Create Team Member"
          createFunc={openCreateDrawer}
          bgColor="bg-purple-500"
          hvbgcolor="bg-purple-600"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-purple-500" />
      ) : noTeamMembers ? (
        <div className="font-sm font-lato">No Team Members</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[3fr_3fr_3fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">First Name</div>
              <div className="whitespace-nowrap">Last Name</div>
              <div className="whitespace-nowrap">Position</div>
              <div className="whitespace-nowrap">Role</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {teamMembers?.map((teamMember: TeamMemberProps) => (
                <AdminTeamMemberRow key={teamMember.id} teamMember={teamMember} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardMembersAndStaff
