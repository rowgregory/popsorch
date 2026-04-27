import ConcertsClient from '@/app/components/pages/ConcertsClient'
import prisma from '@/prisma/client'

export default async function ConcertsPage() {
  const concerts = await prisma.concert
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
    .catch(() => [])

  return <ConcertsClient concerts={concerts} />
}
