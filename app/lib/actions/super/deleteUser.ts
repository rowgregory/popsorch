'use server'

import prisma from '@/prisma/client'
import { getActor } from '../user/getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'
import { createLog } from '@/app/utils/logHelper'
import { revalidateTag } from 'next/cache'
import { verifySuperUser } from './verifySuperUser'

export async function deleteUser(id: string) {
  if (!id) return { success: false, error: 'User ID is required' }

  const [, actor, context] = await Promise.all([verifySuperUser(), getActor(), getRequestContext()])

  const user = await prisma.user.delete({ where: { id } }).catch(() => null)

  if (!user) return { success: false, error: 'Failed to delete user' }

  await createLog(
    'info',
    await buildLogMessage(`deleted user "${user.firstName} ${user.lastName}" (${user.email})`, actor, context),
    {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      deletedBy: actor,
      request: context
    }
  ).catch(() => null)

  revalidateTag('super-users', '')
  return { success: true }
}
