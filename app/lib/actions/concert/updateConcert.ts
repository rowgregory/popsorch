'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { IUpdateConcertInput } from '../../../types/entities/concert'
import { createLog } from '../../../utils/logHelper'
import { InputJsonValue } from '@prisma/client/runtime/library'

export async function updateConcert(id: string, data: IUpdateConcertInput) {
  if (!id) return { success: false, error: 'Concert ID is required' }
  if (!data.name) return { success: false, error: 'Concert name is required' }
  if (!data.description) return { success: false, error: 'Concert description is required' }
  if (!data.imageUrl) return { success: false, error: 'Concert image is required' }
  if (!data.shows || data.shows.length === 0) return { success: false, error: 'At least one show is required' }

  const session = await auth()
  const user = await prisma.user
    .findUnique({
      where: { email: session?.user?.email ?? '' },
      select: { firstName: true, lastName: true, email: true }
    })
    .catch(() => null)

  // Delete removed shows, upsert existing/new ones
  const existingShowIds = data.shows.filter((s) => s.existingId).map((s) => s.existingId!)

  const concert = await prisma.concert
    .update({
      where: { id },
      data: {
        name: data.name,
        pressRelease: data.pressRelease ?? '',
        description: data.description,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        type: data.type ?? 'SEASON',
        cardDate: data.cardDate,

        // v2
        cueBoxExternalLink: data.cueBoxExternalLink ?? '',
        shows: {
          // Delete shows that were removed in the form
          deleteMany: {
            id: { notIn: existingShowIds }
          },
          // Upsert all current shows
          upsert: data.shows.map((s) => ({
            where: { id: s.existingId ?? '' },
            create: {
              venueId: s.venueId,
              date: new Date(s.date),
              externalLink: s.externalLink ?? ''
            },
            update: {
              venueId: s.venueId,
              date: new Date(s.date),
              externalLink: s.externalLink ?? ''
            }
          }))
        },
        season: data.season,
        status: data.status ?? 'DRAFT',
        subtitle: data.subtitle ?? '',

        // Deprecated — preserved until legacy concert is migrated
        isOnSale: false,
        eventDetails: [] as unknown as InputJsonValue,
        allSeriesExternalLink: ''
      },
      include: { shows: true }
    })
    .catch(() => null)

  if (!concert) return { success: false, error: 'Failed to update concert' }

  await createLog('info', `Concert "${concert.name}" updated`, {
    concertId: concert.id,
    updatedBy: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || user?.email || 'unknown'
  }).catch(() => null)

  return { success: true, data: concert }
}
