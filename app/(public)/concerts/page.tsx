import ConcertsClient from '@/app/(public)/concerts/ConcertsClient'
import { ConcertWithShows } from '@/app/types/entities/concert'
import prisma from '@/prisma/client'

export default async function ConcertsPage() {
  const concerts = (await prisma.concert
    .findMany({
      where: { status: { in: ['LIVE', 'ARCHIVED'] } },
      include: {
        shows: {
          include: { venue: true },
          orderBy: { date: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])) as ConcertWithShows[]

  return <ConcertsClient concerts={concerts} />
}
