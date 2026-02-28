'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

interface CreateTeamMemberInput {
  firstName: string
  lastName: string
  position: string
  bio: string
  role: string
  imageUrl: string
  imageFilename: string
  displayOrder?: number
}

export async function createTeamMember(data: CreateTeamMemberInput) {
  try {
    if (!data.firstName) {
      throw new Error('First name is required')
    }

    if (!data.lastName) {
      throw new Error('Last name is required')
    }

    if (!data.position) {
      throw new Error('Position is required')
    }

    if (!data.bio) {
      throw new Error('Bio is required')
    }

    if (!data.role) {
      throw new Error('Role is required')
    }

    if (!data.imageUrl || !data.imageFilename) {
      throw new Error('Team member image is required')
    }

    const teamMember = await prisma.teamMember.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        bio: data.bio,
        role: data.role,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        displayOrder: data.displayOrder || 0
      }
    })

    await createLog('info', 'Team member created successfully', {
      teamMemberId: teamMember.id,
      firstName: teamMember.firstName,
      lastName: teamMember.lastName,
      role: teamMember.role
    })

    return { success: true, teamMember }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create team member'

    await createLog('error', 'Failed to create team member', {
      error: errorMessage,
      inputData: {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role
      }
    })

    throw new Error(errorMessage)
  }
}
