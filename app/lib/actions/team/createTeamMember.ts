'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { TeamMemberRole } from '@prisma/client'

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
  if (!data.firstName) return { success: false, error: 'First name is required' }
  if (!data.lastName) return { success: false, error: 'Last name is required' }
  if (!data.position) return { success: false, error: 'Position is required' }
  if (!data.bio) return { success: false, error: 'Bio is required' }
  if (!data.role) return { success: false, error: 'Role is required' }
  if (!data.imageUrl || !data.imageFilename) return { success: false, error: 'Team member image is required' }

  const actor = await getActor()

  const teamMember = await prisma.teamMember
    .create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        bio: data.bio,
        role: data.role as TeamMemberRole,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        displayOrder: data.displayOrder ?? 0
      }
    })
    .catch((err) => {
      console.error('[createTeamMember] prisma error:', err)
      return null
    })

  if (!teamMember) return { success: false, error: 'Failed to create team member — please try again' }

  await createLog('info', `Team member "${teamMember.firstName} ${teamMember.lastName}" created`, {
    teamMemberId: teamMember.id,
    name: `${teamMember.firstName} ${teamMember.lastName}`,
    role: teamMember.role,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: teamMember }
}
