'use client'

import React from 'react'
import { RootState, useAppDispatch, useAppSelector, useTeamMemberSelector, useTextBlockSelector } from '../redux/store'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'
import { resetDrawerData, setCloseDrawer, setOpenDrawer } from '../redux/features/appSlice'
import PublicBoardAndStaffDrawer from '../drawers/PublicBoardAndStaffDrawer'
import Breadcrumb from '../components/common/Breadcrumb'
import TitleWithLine from '../components/common/TitleWithLine'
import PublicTeamMemberCard from '../components/team/TeamMemberCard'

const Musicians = () => {
  const dispatch = useAppDispatch()
  const { drawer } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useTextBlockSelector()
  const { musicians } = useTeamMemberSelector()

  const handleOpenDrawer = (selectedMember: TeamMemberProps) => {
    const combinedList: TeamMemberProps[] = [...musicians]
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

  const sortedMusicians = [...musicians].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <>
      <PublicBoardAndStaffDrawer />
      <Breadcrumb breadcrumb="Musicians" />
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
          <TitleWithLine
            title={textBlockMap?.MUSICIANS_PAGE?.musiciansTitle || 'Musicians'}
            type="MUSICIANS_PAGE"
            textBlockKey="musiciansTitle"
          />
          <div className="grid grid-cols-12 gap-y-6 760:gap-7 mt-12 w-full">
            {sortedMusicians?.map((teamMember: TeamMemberProps, index: number) => (
              <PublicTeamMemberCard
                key={teamMember.id}
                teamMember={teamMember}
                handleOpenDrawer={handleOpenDrawer}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Musicians
