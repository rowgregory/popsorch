import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getVenues = unstable_cache(
  async () => {
    try {
      const venues = await prisma.venue.findMany()

      return {
        venues,
        count: venues.length,
        noVenues: venues.length === 0
      }
    } catch {
      return {
        venues: [],
        count: 0,
        noVenues: 0
      }
    }
  },
  ['getVenues'],
  {
    tags: ['Venue']
  }
)
