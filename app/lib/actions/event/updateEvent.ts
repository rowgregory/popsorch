'use server'

import { EventInput } from '@/app/types/entities/event'
import { getActor } from '../user/getActor'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'

export async function updateEvent(id: string, data: EventInput) {
  if (!id) return { success: false, error: 'Event ID is required' }
  if (!data.title) return { success: false, error: 'Title is required' }
  if (!data.date) return { success: false, error: 'Date is required' }

  const actor = await getActor()

  const event = await prisma.event
    .update({
      where: { id },
      data: {
        title: data.title,
        date: new Date(data.date),
        location: data.location ?? '',
        description: data.description ?? '',
        status: data.status ?? 'DRAFT'
      }
    })
    .catch(() => null)

  if (!event) return { success: false, error: 'Failed to update event' }

  await createLog('info', `Event "${event.title}" updated`, {
    eventId: event.id,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: event }
}
