import prisma from '@/prisma/client'

export const getConcertsByType = async (type: string) => {
  try {
    const concerts = await prisma.concert.findMany({
      where: { type },
      orderBy: [{ createdAt: 'desc' }]
    })

    const sortedConcerts = concerts.sort((a: any, b: any) => {
      const aDate = new Date(a.eventDetails[0]?.date || a.cardDate)
      const bDate = new Date(b.eventDetails[0]?.date || b.cardDate)
      return aDate.getTime() - bDate.getTime()
    })

    // Parse eventDetails for each concert
    const parsedConcerts = sortedConcerts.map((concert) => {
      let eventDetails: any[] = []

      if (Array.isArray(concert.eventDetails)) {
        eventDetails = concert.eventDetails
      }

      return {
        ...concert,
        eventDetails
      }
    })

    return {
      concerts: parsedConcerts,
      count: parsedConcerts.length,
      type
    }
  } catch (error) {
    return {
      concerts: [],
      count: 0,
      type
    }
  }
}
