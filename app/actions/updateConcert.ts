'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface EventDetail {
  id: string
  city: string
  date: string
  dayOfWeek?: string
  time: string
  location: {
    name: string
    address: string
    venueId: string
    latitude: string
    longitude: string
  }
  externalLink?: string
}

interface UpdateConcertInput {
  name?: string
  pressRelease?: string
  description?: string
  eventDetails?: EventDetail[]
  imageUrl?: string
  imageFilename?: string
  isOnSale?: boolean
  type?: string
  allSeriesExternalLink?: string
  cardDate?: string
}

export async function updateConcert(concertId: string, data: UpdateConcertInput) {
  try {
    if (!concertId) {
      throw new Error('Concert ID is required')
    }

    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.pressRelease !== undefined) updateData.pressRelease = data.pressRelease
    if (data.description) updateData.description = data.description
    if (data.eventDetails) updateData.eventDetails = data.eventDetails
    if (data.imageUrl) updateData.imageUrl = data.imageUrl
    if (data.imageFilename) updateData.imageFilename = data.imageFilename
    if (typeof data.isOnSale === 'boolean') updateData.isOnSale = data.isOnSale
    if (data.type !== undefined) updateData.type = data.type
    if (data.allSeriesExternalLink !== undefined) updateData.allSeriesExternalLink = data.allSeriesExternalLink
    if (data.cardDate) updateData.cardDate = data.cardDate

    const concert = await prisma.concert.update({
      where: { id: concertId },
      data: updateData
    })

    await createLog('info', 'Concert updated successfully', {
      concertId: concert.id,
      name: concert.name,
      type: concert.type
    })

    revalidateTag('Concert', 'default')
    return { success: true, concert }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update concert'

    await createLog('error', 'Failed to update concert', {
      error: errorMessage,
      inputData: {
        concertId
      }
    })

    throw new Error(errorMessage)
  }
}
