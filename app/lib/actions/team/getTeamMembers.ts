import prisma from '@/prisma/client'

export const getTeamMembers = async () => {
  try {
    const [teamMembers, staff, boardMembers, musicians] = await Promise.all([
      prisma.teamMember.findMany(),
      prisma.teamMember.findMany({
        where: { role: 'STAFF' },
        orderBy: { displayOrder: 'asc' }
      }),
      prisma.teamMember.findMany({
        where: { role: 'BOARD_MEMBER' },
        orderBy: { displayOrder: 'asc' }
      }),
      prisma.teamMember.findMany({
        where: { role: 'MUSICIAN' },
        orderBy: { displayOrder: 'asc' }
      })
    ])

    return {
      teamMembers,
      noTeamMembers: teamMembers.length === 0,
      count: teamMembers.length,
      staff,
      staffCount: staff.length,
      boardMembers,
      boardMembersCount: boardMembers.length,
      musicians,
      musiciansCount: musicians.length
    }
  } catch (error) {
    return {
      teamMembers: [],
      count: 0,
      staff: [],
      staffCount: 0,
      boardMembers: [],
      boardMembersCount: 0,
      musicians: [],
      musiciansCount: 0
    }
  }
}
