'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { CreateVenueInput } from '../../../types/entities/venue'

export async function createVenue(data: CreateVenueInput) {
  if (!data.name) return { success: false, error: 'Venue name is required' }
  if (!data.imageUrl || !data.imageFilename) return { success: false, error: 'Venue image is required' }

  const actor = await getActor()

  const venue = await prisma.venue
    .create({
      data: {
        name: data.name,
        city: data.city ?? 'SARASOTA',
        capacity: data.capacity ?? '',
        accessibility: data.accessibility ?? '',
        immersiveEnvironment: data.immersiveEnvironment ?? '',
        parking: data.parking ?? '',
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        address: data.address ?? '',

        // Deprecated
        longitude: '',
        latitude: ''
      }
    })
    .catch((err) => {
      console.error('[createVenue] prisma error:', err)
      return null
    })

  if (!venue) return { success: false, error: 'Failed to create venue — please try again' }

  await createLog('info', `Venue "${venue.name}" created`, {
    venueId: venue.id,
    venueName: venue.name,
    city: venue.city,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: venue }
}
