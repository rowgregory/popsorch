'use client'

import TeamMemberGrid from '../../components/team/TeamMemberGrid'

export const MusiciansClient = ({ data }) => {
  const sortedMusicians = [...data].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="main-content">
      <TeamMemberGrid
        title="Musicians"
        description="The talented performers who bring music to life"
        teamMembers={sortedMusicians}
        headingId="musicians-heading"
        role="musicians"
      />
    </div>
  )
}
