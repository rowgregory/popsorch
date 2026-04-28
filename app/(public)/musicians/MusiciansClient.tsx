'use client'

import Breadcrumb from '@/app/components/common/Breadcrumb'
import TeamMemberGrid from '../../components/TeamMemberGrid'

export const MusiciansClient = ({ data }) => {
  const sortedMusicians = [...data].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="main-content">
      <Breadcrumb breadcrumb="Musicians" />

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
