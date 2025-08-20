import { TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import React, { FC } from 'react'
import Picture from '../common/Picture'
import AwesomeIcon from '../common/AwesomeIcon'
import { expandIcon } from '@/app/lib/icons'

const PublicTeamMemberCard: FC<{
  teamMember: TeamMemberProps
  handleOpenDrawer?: (teamMember: TeamMemberProps) => void
}> = ({ teamMember, handleOpenDrawer }) => {
  const isSqysh = teamMember.firstName === 'Sqysh'

  return (
    <div
      onClick={() =>
        isSqysh
          ? window.open('https://sqysh.io?lead_source=the_pops_orchestra', '_blank')
          : handleOpenDrawer
          ? handleOpenDrawer(teamMember)
          : {}
      }
      className={`col-span-12 990:col-span-6 1200:col-span-4 cursor-pointer group`}
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
        <div className="text-blaze text-12 uppercase group-hover:text-white duration-300"> {teamMember.position}</div>
      </div>
    </div>
  )
}

export default PublicTeamMemberCard
