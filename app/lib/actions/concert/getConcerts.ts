import prisma from '@/prisma/client'

export const getConcerts = async () => {
  const concerts = await prisma.concert
    .findMany({
      include: {
        shows: {
          include: { venue: true },
          orderBy: { date: 'asc' } // Sort shows by date
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  // Sort by first show date (shows already sorted above)
  const sortedConcerts = concerts.sort((a, b) => {
    const aDate = a.shows[0]?.date ? new Date(a.shows[0].date) : new Date(a.cardDate || 0)
    const bDate = b.shows[0]?.date ? new Date(b.shows[0].date) : new Date(b.cardDate || 0)
    return aDate.getTime() - bDate.getTime()
  })

  const onSaleConcerts = sortedConcerts.filter((c) => c.isOnSale)

  return {
    concerts: sortedConcerts,
    count: sortedConcerts.length,
    noConcerts: sortedConcerts.length === 0,
    onSaleConcerts,
    onSaleCount: onSaleConcerts.length
  }
}
