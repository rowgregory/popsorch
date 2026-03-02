import { TeamMemberProps } from '@/app/redux/features/teamMemberSlice'
import { FC } from 'react'
import Picture from '../common/Picture'
import { Expand } from 'lucide-react'

interface ITeamMemberCard {
  teamMember: TeamMemberProps
  index: number
  handleOpenDrawer?: (teamMember: TeamMemberProps) => void
  height?: number
}

const TeamMemberCard: FC<ITeamMemberCard> = ({ teamMember, index, handleOpenDrawer, height = 400 }) => {
  const isSqysh = teamMember.firstName === 'Sqysh'

  const handleClick = () => {
    if (isSqysh) {
      window.open('https://sqysh.io?lead_source=the_pops_orchestra', '_blank')
    } else if (handleOpenDrawer) {
      handleOpenDrawer(teamMember)
    }
  }

  const fullName = `${teamMember.firstName} ${teamMember.lastName}`.trim()
  const ariaLabel = isSqysh
    ? `${fullName} — visit Sqysh website (opens in new tab)`
    : `View biography for ${fullName}, ${teamMember.position}`

  return (
    <li className="col-span-12 990:col-span-6 1200:col-span-4 group">
      <button
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-inkblack rounded-md"
      >
        <div className="overflow-hidden relative rounded-tl-md rounded-tr-md">
          <Picture
            src={teamMember.imageUrl}
            alt={`Portrait of ${fullName}`}
            className="aspect-9/13 w-full h-full object-cover group-hover:scale-110 duration-500"
            priority={index < 6}
            width={400}
            height={height}
          />
          <div
            className="flex flex-col justify-center items-center h-full p-10 bg-none group-hover:bg-duskygray/50 group-hover:backdrop-blur-md absolute inset-0 z-10 duration-500"
            aria-hidden="true"
          >
            <Expand className="translate-y-2 group-hover:translate-y-0 text-white opacity-0 group-hover:opacity-100 duration-500 font-bold text-2xl text-center" />
          </div>
        </div>

        <div className="bg-[#2a2a2a] flex justify-center items-center flex-col p-8 rounded-br-md rounded-bl-md">
          <p className="text-2xl font-bold text-white font-changa duration-300 group-hover:text-blaze">{fullName}</p>
          <p className="text-blaze text-12 uppercase group-hover:text-white duration-300">{teamMember.position}</p>
        </div>
      </button>
    </li>
  )
}

export default TeamMemberCard
