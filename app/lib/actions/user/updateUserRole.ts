// lib/actions/user/updateUserRole.ts
'use server'

import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import type { UserRole } from '@prisma/client'
import { getActor } from './getActor'

export async function updateUserRole(userId: string, role: UserRole) {
  if (!userId) return { success: false, error: 'User ID is required' }
  if (!role) return { success: false, error: 'Role is required' }

  const actor = await getActor()

  const user = await prisma.user
    .update({
      where: { id: userId },
      data: { role }
    })
    .catch(() => null)

  if (!user) return { success: false, error: 'Failed to update user role' }

  await createLog('info', `User "${user.name}" role updated to ${role}`, {
    userId: user.id,
    userName: user.name,
    newRole: role,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: user }
}
