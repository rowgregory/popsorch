import prisma from '@/prisma/client'

export const getVenues = async () => {
  const venues = await prisma.venue
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return venues
}
