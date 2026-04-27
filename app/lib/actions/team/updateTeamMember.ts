'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { TeamMemberRole } from '@prisma/client'

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
  if (!teamMemberId) return { success: false, error: 'Team member ID is required' }

  const actor = await getActor()

  const teamMember = await prisma.teamMember
    .update({
      where: { id: teamMemberId },
      data: {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.position && { position: data.position }),
        ...(data.bio && { bio: data.bio }),
        ...(data.role && { role: data.role as TeamMemberRole }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.imageFilename !== undefined && { imageFilename: data.imageFilename }),
        ...(typeof data.displayOrder === 'number' && { displayOrder: data.displayOrder })
      }
    })
    .catch((err) => {
      console.error('[updateTeamMember] prisma error:', err)
      return null
    })

  if (!teamMember) return { success: false, error: 'Failed to update team member — please try again' }

  await createLog('info', `Team member "${teamMember.firstName} ${teamMember.lastName}" updated`, {
    teamMemberId: teamMember.id,
    name: `${teamMember.firstName} ${teamMember.lastName}`,
    role: teamMember.role,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: teamMember }
}
