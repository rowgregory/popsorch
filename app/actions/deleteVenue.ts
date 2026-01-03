'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function deleteVenue(venueId: string) {
  try {
    if (!venueId) {
      throw new Error('Venue ID is required')
    }

    const venue = await prisma.venue.delete({
      where: { id: venueId }
    })

    await createLog('info', 'Venue deleted successfully', {
      venueId: venue.id,

      name: venue.name,
      address: venue.address
    })

    revalidateTag('Venue', 'default')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete venue'

    await createLog('error', 'Failed to delete venue', {
      error: errorMessage,
      inputData: {
        venueId
      }
    })

    throw new Error(errorMessage)
  }
}
