import ConcertsClient from '@/app/components/v2/pages/ConcertsClient'
import prisma from '@/prisma/client'

export default async function ConcertsPage() {
  const concerts = await prisma.concert
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return <ConcertsClient concerts={concerts} />
}
