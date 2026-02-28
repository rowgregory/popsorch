import prisma from '@/prisma/client'
import { IConcertEventDetails } from '../types/entities/concert'

export const getConcertById = async (id: string) => {
  try {
    const concert = await prisma.concert.findUnique({
      where: { id }
    })

    if (!concert) return null

    // Type guard and parse JSON eventDetails
    let eventDetails: IConcertEventDetails[] = []

    if (Array.isArray(concert.eventDetails)) {
      eventDetails = concert.eventDetails as unknown as IConcertEventDetails[]
    }

    return {
      ...concert,
      eventDetails
    }
  } catch {
    return null
  }
}
