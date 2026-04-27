'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'
import { ICreateConcertInput } from '../../../types/entities/concert'
import { headers } from 'next/headers'
import { createLog } from '../../../utils/logHelper'
import { InputJsonValue } from '@prisma/client/runtime/library'

export async function createConcert(data: ICreateConcertInput) {
  if (!data.name) return { success: false, error: 'Concert name is required' }
  if (!data.description) return { success: false, error: 'Concert description is required' }
  if (!data.imageUrl || !data.imageFilename) return { success: false, error: 'Concert image is required' }
  if (!data.shows || data.shows.length === 0) return { success: false, error: 'At least one show date is required' }

  const session = await auth()

  const [user, headersList] = await Promise.all([
    prisma.user
      .findUnique({
        where: { email: session?.user?.email ?? '' },
        select: { firstName: true, lastName: true, email: true }
      })
      .catch(() => null),
    headers()
  ])

  const concert = await prisma.concert
    .create({
      data: {
        name: data.name,
        description: data.description,
        pressRelease: data.pressRelease ?? '',
        type: data.type ?? 'SEASON',
        cardDate: data.cardDate,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,

        // v2
        cueBoxExternalLink: data.cueBoxExternalLink ?? '',
        season: data.season ?? '26-27',
        shows: {
          create: data.shows.map((s) => ({
            venueId: s.venueId,
            date: new Date(s.date),
            externalLink: s.externalLink ?? ''
          }))
        },
        status: data.status ?? 'DRAFT',
        subtitle: data.subtitle ?? '',

        // Deprecated — required until legacy concert is migrated
        isOnSale: false,
        eventDetails: [] as unknown as InputJsonValue,
        allSeriesExternalLink: ''
      },
      include: { shows: { include: { venue: true } } }
    })
    .catch((err) => {
      console.error('[createConcert] prisma error:', err)
      return null
    })

  if (!concert) return { success: false, error: 'Failed to create concert — please try again' }

  await createLog('info', `Concert "${concert.name}" created`, {
    concertId: concert.id,
    concertName: concert.name,
    createdAt: concert.createdAt.toISOString(),
    createdBy: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || user?.email || 'unknown',
    userAgent: headersList.get('user-agent') ?? 'unknown'
  }).catch(() => null)

  return { success: true, data: concert }
}
