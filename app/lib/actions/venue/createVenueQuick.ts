'use server'

import prisma from '@/prisma/client'

export async function createVenueQuick({ name }: { name: string }) {
  if (!name) return { success: false, error: 'Venue name is required' }

  const venue = await prisma.venue
    .create({
      data: {
        name,
        capacity: '',
        accessibility: '',
        immersiveEnvironment: '',
        parking: '',
        imageUrl: '',
        imageFilename: '',
        address: ''
      }
    })
    .catch(() => null)

  if (!venue) return { success: false, error: 'Failed to create venue' }

  return { success: true, data: venue }
}
