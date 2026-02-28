'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

interface UpdateVenueInput {
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

export async function updateVenue(venueId: string, data: UpdateVenueInput) {
  try {
    if (!venueId) {
      throw new Error('Venue ID is required')
    }

    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.capacity !== undefined) updateData.capacity = data.capacity
    if (data.accessibility) updateData.accessibility = data.accessibility
    if (data.immersiveEnvironment) updateData.immersiveEnvironment = data.immersiveEnvironment
    if (data.parking) updateData.parking = data.parking
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl
    if (data.imageFilename !== undefined) updateData.imageFilename = data.imageFilename
    if (data.address) updateData.address = data.address
    if (data.longitude) updateData.longitude = data.longitude
    if (data.latitude) updateData.latitude = data.latitude

    const venue = await prisma.venue.update({
      where: { id: venueId },
      data: updateData
    })

    await createLog('info', 'Venue updated successfully', {
      venueId: venue.id,
      name: venue.name
    })

    return { success: true, venue }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update venue'

    await createLog('error', 'Failed to update venue', {
      error: errorMessage,
      inputData: {
        venueId
      }
    })

    throw new Error(errorMessage)
  }
}
