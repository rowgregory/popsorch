'use client'

import TeamMemberGrid from '../../components/team/TeamMemberGrid'

export const StaffClient = ({ staff }) => {
  const sortedStaff = [...staff].sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <div id="main-content">
      <TeamMemberGrid
        title="Staff"
        description="Meet the dedicated team behind The Pops Orchestra"
        teamMembers={sortedStaff}
        headingId="staff-heading"
        role="staff"
      />
    </div>
  )
}
