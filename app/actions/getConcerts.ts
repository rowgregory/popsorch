import prisma from '@/prisma/client'

export const getConcerts = async () => {
  try {
    const concerts = await prisma.concert.findMany({
      orderBy: [{ createdAt: 'desc' }]
    })

    const sortedConcerts = concerts.sort((a: any, b: any) => {
      const aDate = new Date(a.eventDetails[0]?.date || a.cardDate)
      const bDate = new Date(b.eventDetails[0]?.date || b.cardDate)
      return aDate.getTime() - bDate.getTime()
    })

    return {
      concerts: sortedConcerts,
      count: sortedConcerts.length,
      noConcerts: sortedConcerts.length === 0,
      onSaleConcerts: sortedConcerts.filter((c) => c.isOnSale),
      onSaleCount: sortedConcerts.filter((c) => c.isOnSale).length
    }
  } catch (error) {
    return {
      concerts: [],
      count: 0,
      noConcerts: 0,
      onSaleConcerts: [],
      onSaleCount: 0
    }
  }
}
