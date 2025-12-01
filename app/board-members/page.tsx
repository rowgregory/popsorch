'use client'

import React from 'react'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'
import PublicBoardAndStaffDrawer from '../drawers/PublicBoardAndStaffDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { resetDrawerData, setCloseDrawer, setOpenDrawer } from '../redux/features/appSlice'
import Spinner from '../components/common/Spinner'
import Breadcrumb from '../components/common/Breadcrumb'
import TitleWithLine from '../components/common/TitleWithLine'
import PublicTeamMemberCard from '../components/admin/PublicTeamMemberCard'

const BoardMembers = () => {
  const dispatch = useAppDispatch()
  const { drawer, loading } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { boardMembers } = useAppSelector((state: RootState) => state.teamMember)

  const handleOpenDrawer = (selectedMember: TeamMemberProps) => {
    const combinedList: TeamMemberProps[] = [...boardMembers]
    const selectedIndex = combinedList.findIndex((m) => m.id === selectedMember.id)

    dispatch(resetDrawerData())
    dispatch(
      setOpenDrawer({
        teamMember: selectedMember,
        teamList: combinedList,
        selectedIndex
      })
    )
  }

  const sortedBoardMembers = [...boardMembers].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <>
      <PublicBoardAndStaffDrawer />
      <Breadcrumb breadcrumb="Board Members" />
      {drawer && (
        <div
          onClick={() => dispatch(setCloseDrawer())}
          className={`min-h-dvh w-full absolute inset-0 z-50 duration-700 backdrop-blur-md bg-black/60 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      )}
      <div className="bg-[#1a1a1a] px-4 990:px-12 xl:px-4 relative z-0">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto flex flex-col items-center py-28">
          {loading ? (
            <div className="flex justify-center">
              <Spinner wAndH="w-10 h-10" fill="fill-blaze" track="text-[#1a1a1a]" />
            </div>
          ) : (
            <>
              <TitleWithLine
                title={textBlockMap?.BOARD_MEMBERS_PAGE?.boardMemberTitle || 'Board Members'}
                type="BOARD_MEMBERS_PAGE"
                textBlockKey="boardMemberTitle"
              />
              <div className="grid grid-cols-12 gap-y-6 760:gap-7 mt-12 mb-32">
                {sortedBoardMembers?.map((teamMember: TeamMemberProps, index: number) => (
                  <PublicTeamMemberCard
                    key={teamMember.id}
                    teamMember={teamMember}
                    handleOpenDrawer={handleOpenDrawer}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BoardMembers
