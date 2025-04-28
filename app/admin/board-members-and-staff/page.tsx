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
  const { teamMembers, error } = useAppSelector((state: RootState) => state.teamMember)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <AdminTeamMemberCreateDrawer />
      <AdminTeamMemberUpdateDrawer />
      <ToastMessage message={error} resetError={() => resetTeamMemberError()} />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Board Members & Staff"
          total={teamMembers?.length}
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
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-3 whitespace-nowrap">First Name</div>
              <div className="col-span-3 whitespace-nowrap">Last Name</div>
              <div className="col-span-3 whitespace-nowrap">Position</div>
              <div className="col-span-2 whitespace-nowrap">Role</div>
              <div className="col-span-1"></div>
            </div>
            <div className="flex flex-col gap-y-3">
              {teamMembers?.map((teamMember: TeamMemberProps) => (
                <AdminTeamMemberRow key={teamMember.id} teamMember={teamMember} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BoardMembersAndStaff
