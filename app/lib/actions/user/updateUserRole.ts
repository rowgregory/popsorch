'use server'

import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import type { UserRole } from '@prisma/client'
import { getActor } from './getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'

export async function updateUserRole(userId: string, role: UserRole) {
  if (!userId) return { success: false, error: 'User ID is required' }
  if (!role) return { success: false, error: 'Role is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const user = await prisma.user
    .update({
      where: { id: userId },
      data: { role }
    })
    .catch(() => null)

  if (!user) return { success: false, error: 'Failed to update user role' }

  await createLog(
    'info',
    await buildLogMessage(`updated role for "${user.firstName} ${user.lastName}" to ${role}`, actor, context),
    {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      newRole: role,
      updatedBy: actor,
      request: context
    }
  ).catch(() => null)

  return { success: true, data: user }
}
