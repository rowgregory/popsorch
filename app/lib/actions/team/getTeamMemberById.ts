'use server'

import prisma from '@/prisma/client'

export async function getTeamMemberById(teamMemberId: string) {
  if (!teamMemberId) return { success: false, error: 'Team member ID is required' }

  const teamMember = await prisma.teamMember
    .findUnique({
      where: { id: teamMemberId }
    })
    .catch(() => null)

  if (!teamMember) return { success: false, error: 'Team member not found' }

  return { success: true, data: teamMember }
}
