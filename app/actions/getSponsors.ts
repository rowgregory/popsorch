import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getSponsors = unstable_cache(
  async () => {
    try {
      const sponsors = await prisma.sponsor.findMany({
        orderBy: [{ level: 'asc' }]
      })

      return {
        sponsors,
        count: sponsors.length,
        noSponsors: sponsors.length === 0,
        totalAmount: sponsors?.reduce((sum: number, sponsor: { amount: string }) => sum + parseInt(sponsor.amount), 0)
      }
    } catch {
      return {
        sponsors: [],
        count: 0,
        totalAmount: 0
      }
    }
  },
  ['sponsors'],
  {
    tags: ['Sponsor']
  }
)
