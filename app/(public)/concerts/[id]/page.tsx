import ConcertDetailsClient from '@/app/components/pages/ConcertDetailsClient'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

export default async function ConcertDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const concert = await prisma.concert
    .findUnique({
      where: { id },
      include: {
        shows: {
          include: { venue: true },
          orderBy: { date: 'asc' }
        }
      }
    })
    .catch(() => null)

  if (!concert || concert.status === 'DRAFT') notFound()

  return <ConcertDetailsClient concert={concert} />
}
