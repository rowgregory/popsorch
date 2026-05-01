'use server'

import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { getActor } from '../user/getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'
import { revalidateTag } from 'next/cache'

export async function deleteCampApplication(id: string) {
  if (!id) return { success: false, error: 'Application ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const application = await prisma.campApplication
    .delete({
      where: { id }
    })
    .catch(() => null)

  if (!application) {
    await createLog('error', await buildLogMessage(`failed to delete camp application "${id}"`, actor, context), {
      applicationId: id,
      deletedBy: actor,
      request: context
    }).catch(() => null)

    return { success: false, error: 'Failed to delete application' }
  }

  await createLog('info', await buildLogMessage(`deleted camp application "${id}"`, actor, context), {
    applicationId: id,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  revalidateTag('super-dashboard', 'default')
  return { success: true }
}
