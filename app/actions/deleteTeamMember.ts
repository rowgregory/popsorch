'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function deleteTeamMember(teamMemberId: string) {
  try {
    if (!teamMemberId) {
      throw new Error('Team member ID is required')
    }

    const teamMember = await prisma.teamMember.delete({
      where: { id: teamMemberId }
    })

    await createLog('info', 'Team member deleted successfully', {
      teamMemberId: teamMember.id,
      firstName: teamMember.firstName,
      lastName: teamMember.lastName
    })

    revalidateTag('Team-Member', 'default')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete team member'

    await createLog('error', 'Failed to delete team member', {
      error: errorMessage,
      inputData: {
        teamMemberId
      }
    })

    throw new Error(errorMessage)
  }
}
