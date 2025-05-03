'use client'

import React, { FC } from 'react'
import { useFetchTeamMembersQuery } from '../redux/services/teamMemberApi'
import { TeamMemberProps } from '../redux/features/teamMemberSlice'
import Picture from '../components/common/Picture'
import PublicBoardAndStaffDrawer from '../drawers/PublicBoardAndStaffDrawer'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { resetDrawerData, setCloseDrawer, setOpenDrawer } from '../redux/features/appSlice'
import Spinner from '../components/common/Spinner'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { expandIcon } from '../lib/icons'
import Breadcrumb from '../components/common/Breadcrumb'
import TitleWithLine from '../components/common/TitleWithLine'

const TeamMemberCard: FC<{ teamMember: TeamMemberProps; handleOpenDrawer?: (teamMember: TeamMemberProps) => void }> = ({
  teamMember,
  handleOpenDrawer
}) => {
  const isSqysh = teamMember.firstName === 'Sqysh'

  return (
    <div
      onClick={() =>
        isSqysh ? window.open('https://sqysh.io', '_blank') : handleOpenDrawer ? handleOpenDrawer(teamMember) : {}
      }
      className={`col-span-12 760:col-span-6 990:col-span-4 cursor-pointer group`}
    >
      <div className="overflow-hidden relative rounded-tl-md rounded-tr-md">
        <Picture
          src={teamMember.imageUrl}
          className="aspect-square w-full h-full object-cover group-hover:scale-110 duration-500"
          priority={true}
        />
        <div className="flex flex-col justify-center items-center h-full p-10 bg-none group-hover:bg-duskygray/50 group-hover:backdrop-blur-md absolute inset-0 z-10 duration-500">
          <AwesomeIcon
            icon={expandIcon}
            className="translate-y-2 group-hover:translate-y-0 text-white opacity-0 group-hover:opacity-100 duration-500 font-bold text-2xl text-center"
          />
        </div>
      </div>
      <div className="bg-[#2a2a2a] flex justify-center items-center flex-col p-8 rounded-br-md rounded-bl-md">
        <div className="text-2xl font-bold text-white font-changa duration-300 group-hover:text-blaze">
          {teamMember.firstName} {teamMember.lastName}
        </div>
        <div className="text-blaze text-12 uppercase"> {teamMember.position}</div>
      </div>
    </div>
  )
}

const BoardAndStaff = () => {
  const { data, isLoading } = useFetchTeamMembersQuery({})
  const dispatch = useAppDispatch()
  const { drawer } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const handleOpenDrawer = (selectedMember: TeamMemberProps) => {
    if (!data?.teamMembers) return

    const combinedList: TeamMemberProps[] = [...boardMembers, ...staffMembers]
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

  const boardMembers: TeamMemberProps[] = []
  const staffMembers: TeamMemberProps[] = []

  data?.teamMembers?.forEach((teamMember: TeamMemberProps) => {
    if (teamMember.role === 'Board-Member') {
      boardMembers.push(teamMember)
    } else if (teamMember.role === 'Staff') {
      staffMembers.push(teamMember)
    }
  })

  return (
    <>
      <PublicBoardAndStaffDrawer />
      <Breadcrumb breadcrumb="Board & Staff" />
      {drawer && (
        <div
          onClick={() => dispatch(setCloseDrawer())}
          className={`min-h-dvh w-full absolute inset-0 z-50 duration-700 backdrop-blur-md bg-black/60 ${
            drawer ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      )}
      <div className="bg-[#1a1a1a] px-3 relative z-0">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 w-full mx-auto flex flex-col items-center py-28">
          {isLoading ? (
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
                {boardMembers.map((teamMember: TeamMemberProps) => (
                  <TeamMemberCard key={teamMember.id} teamMember={teamMember} handleOpenDrawer={handleOpenDrawer} />
                ))}
              </div>
              <TitleWithLine
                title={textBlockMap?.BOARD_MEMBERS_PAGE?.staffTitle || 'Staff'}
                type="BOARD_MEMBERS_PAGE"
                textBlockKey="staffTitle"
              />
              <div className="grid grid-cols-12 gap-y-6 760:gap-7 mt-12 w-full">
                {staffMembers.map((teamMember: TeamMemberProps) => (
                  <TeamMemberCard key={teamMember.id} teamMember={teamMember} handleOpenDrawer={handleOpenDrawer} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BoardAndStaff
