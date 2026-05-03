import EventsClient from '@/app/components/pages/EventsClient'
import prisma from '@/prisma/client'

export default async function EventsPage() {
  const events = await prisma.event
    .findMany({
      orderBy: { date: 'asc' }
    })
    .catch(() => [])

  return <EventsClient events={events} />
}
