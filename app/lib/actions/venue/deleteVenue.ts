'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'

export async function deleteVenue(id: string) {
  if (!id) return { success: false, error: 'Venue ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const venue = await prisma.venue.delete({ where: { id } }).catch(() => null)

  if (!venue) return { success: false, error: 'Failed to delete venue' }

  await createLog('info', await buildLogMessage(`deleted venue "${venue.name}"`, actor, context), {
    venueId: venue.id,
    name: venue.name,
    city: venue.city,
    address: venue.address,
    deletedBy: actor,
    request: context
  }).catch(() => null)

  return { success: true }
}
