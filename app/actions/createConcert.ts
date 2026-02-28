'use server'

import prisma from '@/prisma/client'
import { InputJsonValue } from '@prisma/client/runtime/library'
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

interface CreateConcertInput {
  name: string
  pressRelease?: string
  description: string
  eventDetails: EventDetail[]
  imageUrl: string
  imageFilename: string
  isOnSale?: boolean
  type?: string
  allSeriesExternalLink?: string
  cardDate: string
}

export async function createConcert(data: CreateConcertInput) {
  try {
    if (!data.name) {
      throw new Error('Concert name is required')
    }

    if (!data.description) {
      throw new Error('Concert description is required')
    }

    if (!data.imageUrl || !data.imageFilename) {
      throw new Error('Concert image is required')
    }

    if (!data.eventDetails || data.eventDetails.length === 0) {
      throw new Error('At least one event detail is required')
    }

    const concert = await prisma.concert.create({
      data: {
        name: data.name,
        pressRelease: data.pressRelease || '',
        description: data.description,
        eventDetails: data.eventDetails as unknown as InputJsonValue,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        isOnSale: data.isOnSale || false,
        type: data.type || '',
        allSeriesExternalLink: data.allSeriesExternalLink || '',
        cardDate: data.cardDate
      }
    })

    await createLog('info', 'Concert created successfully', {
      concertId: concert.id,
      concertName: concert.name
    })

    return { success: true, concert }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create concert'

    await createLog('error', 'Failed to create concert', {
      error: errorMessage,
      inputData: {
        name: data.name,
        type: data.type
      }
    })

    throw new Error(errorMessage)
  }
}
