import ConcertEditClient from '@/app/components/v2/pages/ConcertEditClient'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

export default async function ConcertEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [concert, venues] = await Promise.all([
    prisma.concert
      .findUnique({
        where: { id },
        include: { shows: { include: { venue: true } } }
      })
      .catch(() => null),
    prisma.venue.findMany({ orderBy: { name: 'asc' } }).catch(() => [])
  ])

  if (!concert) notFound()

  return <ConcertEditClient concert={concert} venues={venues} />
}
