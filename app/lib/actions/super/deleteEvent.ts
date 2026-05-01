'use server'

import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'
import { getActor } from '../user/getActor'
import { verifySuperUser } from './verifySuperUser'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { revalidateTag } from 'next/cache'

export async function deleteEvent(id: string) {
  await verifySuperUser()
  if (!id) return { success: false, error: 'Event ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const event = await prisma.event.delete({ where: { id } }).catch(() => null)
  if (!event) return { success: false, error: 'Failed to delete event' }

  await createLog('info', await buildLogMessage(`deleted event "${event.title}"`, actor, context), {
    eventId: event.id,
    title: event.title,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  revalidateTag('super-dashboard', 'default')
  return { success: true }
}
