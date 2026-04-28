'use client'

import { useRouter } from 'next/navigation'
import TeamMemberCard from './TeamMemberCard'
import type { TeamMember } from '@prisma/client'

interface Props {
  title: string
  description?: string
  teamMembers: TeamMember[]
  headingId: string
  role: string
}

export default function TeamMemberGrid({ title, description, teamMembers, headingId, role }: Props) {
  const router = useRouter()

  const handleCardClick = (teamMember: TeamMember) => {
    router.push(`/${role}/${teamMember.id}`)
  }

  return (
    <section aria-labelledby={headingId} className="px-4 py-12 430:px-6 768:px-8 768:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 768:mb-12 pb-8 768:pb-12 border-b border-white/10">
          <h2 id={headingId} className="font-changa text-2xl 430:text-3xl uppercase tracking-[0.3em] text-blaze mb-3">
            {title}
          </h2>
          {description && (
            <p className="font-lato text-white/50 text-sm 430:text-base max-w-xl leading-relaxed mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Grid */}
        <ul
          role="list"
          aria-label={`${title} members`}
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 990:grid-cols-5 gap-4 430:gap-5 768:gap-6"
        >
          {teamMembers.map((teamMember, index) => (
            <li key={teamMember.id}>
              <TeamMemberCard teamMember={teamMember} index={index} onClick={() => handleCardClick(teamMember)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
