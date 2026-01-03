'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface CreateVenueInput {
  name?: string
  capacity?: string
  accessibility?: string
  immersiveEnvironment?: string
  parking?: string
  imageUrl?: string
  imageFilename?: string
  address?: string
  longitude?: string
  latitude?: string
}

export async function createVenue(data: CreateVenueInput) {
  try {
    const { name, capacity, accessibility, immersiveEnvironment, parking, imageUrl, imageFilename, address } = data

    const venue = await prisma.venue.create({
      data: {
        name,
        capacity,
        accessibility,
        immersiveEnvironment,
        parking,
        imageUrl,
        imageFilename,
        address
      }
    })

    await createLog('info', 'Venue created successfully', {
      venueId: venue.id,
      name: venue.name,
      capacity: venue.capacity,
      address: venue.address
    })

    revalidateTag('Venue', 'default')
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create venue'

    await createLog('error', 'Failed to create venue', {
      error: errorMessage,
      inputData: {
        name: data.name,
        capacity: data.capacity,
        address: data.address
      }
    })

    throw new Error(errorMessage)
  }
}
