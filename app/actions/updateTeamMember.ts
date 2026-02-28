'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

interface UpdateTeamMemberInput {
  firstName?: string
  lastName?: string
  position?: string
  bio?: string
  role?: string
  imageUrl?: string
  imageFilename?: string
  displayOrder?: number
}

export async function updateTeamMember(teamMemberId: string, data: UpdateTeamMemberInput) {
  try {
    if (!teamMemberId) {
      throw new Error('Team member ID is required')
    }

    const updateData: any = {}

    if (data.firstName) updateData.firstName = data.firstName
    if (data.lastName) updateData.lastName = data.lastName
    if (data.position) updateData.position = data.position
    if (data.bio) updateData.bio = data.bio
    if (data.role) updateData.role = data.role
    if (data.imageUrl) updateData.imageUrl = data.imageUrl
    if (data.imageFilename) updateData.imageFilename = data.imageFilename
    if (typeof data.displayOrder === 'number') updateData.displayOrder = data.displayOrder

    const teamMember = await prisma.teamMember.update({
      where: { id: teamMemberId },
      data: updateData
    })

    await createLog('info', 'Team member updated successfully', {
      teamMemberId: teamMember.id,
      firstName: teamMember.firstName,
      lastName: teamMember.lastName
    })

    return { success: true, teamMember }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update team member'

    await createLog('error', 'Failed to update team member', {
      error: errorMessage,
      inputData: {
        teamMemberId
      }
    })

    throw new Error(errorMessage)
  }
}
