import prisma from '@/prisma/client'

export const getSponsors = async () => {
  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: [{ createdAt: 'desc' }]
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
}
