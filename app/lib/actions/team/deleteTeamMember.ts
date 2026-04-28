'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'

export async function deleteTeamMember(id: string) {
  if (!id) return { success: false, error: 'Team member ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const teamMember = await prisma.teamMember.delete({ where: { id } }).catch(() => null)

  if (!teamMember) return { success: false, error: 'Failed to delete team member' }

  await createLog(
    'info',
    await buildLogMessage(
      `deleted team member "${teamMember.firstName} ${teamMember.lastName}" (${teamMember.role})`,
      actor,
      context
    ),
    {
      teamMemberId: teamMember.id,
      name: `${teamMember.firstName} ${teamMember.lastName}`,
      position: teamMember.position,
      role: teamMember.role,
      deletedBy: actor,
      request: context
    }
  ).catch(() => null)

  return { success: true }
}
