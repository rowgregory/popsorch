'use server'

import { EventInput } from '@/app/types/entities/event'
import { getActor } from '../user/getActor'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'

export async function createEvent(data: EventInput) {
  if (!data.title) return { success: false, error: 'Title is required' }
  if (!data.date) return { success: false, error: 'Date is required' }

  const actor = await getActor()

  const event = await prisma.event
    .create({
      data: {
        title: data.title,
        date: new Date(data.date),
        location: data.location ?? '',
        description: data.description ?? '',
        status: data.status ?? 'DRAFT'
      }
    })
    .catch(() => null)

  if (!event) return { success: false, error: 'Failed to create event' }

  await createLog('info', `Event "${event.title}" created`, {
    eventId: event.id,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: event }
}
