'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { UpdateVenueInput } from '../../../types/entities/venue'
import { getActor } from '../user/getActor'

export async function updateVenue(venueId: string, data: UpdateVenueInput) {
  if (!venueId) return { success: false, error: 'Venue ID is required' }

  const actor = await getActor()

  const venue = await prisma.venue
    .update({
      where: { id: venueId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.city && { city: data.city }),
        ...(data.capacity !== undefined && { capacity: data.capacity }),
        ...(data.accessibility !== undefined && { accessibility: data.accessibility }),
        ...(data.immersiveEnvironment !== undefined && { immersiveEnvironment: data.immersiveEnvironment }),
        ...(data.parking !== undefined && { parking: data.parking }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.imageFilename !== undefined && { imageFilename: data.imageFilename }),
        ...(data.address !== undefined && { address: data.address })
      }
    })
    .catch((err) => {
      console.error('[updateVenue] prisma error:', err)
      return null
    })

  if (!venue) return { success: false, error: 'Failed to update venue — please try again' }

  await createLog('info', `Venue "${venue.name}" updated`, {
    venueId: venue.id,
    venueName: venue.name,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: venue }
}
