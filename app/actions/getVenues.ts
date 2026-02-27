import prisma from '@/prisma/client'

export const getVenues = async () => {
  try {
    const venues = await prisma.venue.findMany()

    return venues
  } catch {
    return {
      venues: [],
      count: 0,
      noVenues: 0
    }
  }
}
