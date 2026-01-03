import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getTeamMemberByRole = unstable_cache(
  async (role: string) => {
    try {
      const teamMembers = await prisma.teamMember.findMany({
        where: { role },
        orderBy: [{ displayOrder: 'asc' }]
      })

      return teamMembers
    } catch (error) {
      error(`Failed to fetch team members by role "${role}":`, error)
      return {
        teamMembers: [],
        count: 0,
        role
      }
    }
  },
  ['getTeamMemberByRole'],
  {
    tags: ['Team-Member']
  }
)
