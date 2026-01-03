import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'
import { IConcertEventDetails } from '../types/entities/concert'

export const getConcertById = unstable_cache(
  async (id: string) => {
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
    } catch (error) {
      return null
    }
  },
  ['getConcert'],
  {
    tags: ['Concert']
  }
)
