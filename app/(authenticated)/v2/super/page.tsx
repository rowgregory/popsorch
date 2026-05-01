import { redirect } from 'next/navigation'
import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'
import { auth } from '@/app/lib/auth'
import SuperClient from '@/app/components/v2/pages/SuperClient'
import { getDatabaseHealth } from '@/app/lib/actions/super/getDatabaseHealth'

async function fetchSuperDashboardData() {
  const [
    customRequests,
    concerts,
    venues,
    teamMembers,
    news,
    events,
    testimonials,
    sponsors,
    questions,
    users,
    dbHealth
  ] = await Promise.all([
    prisma.customRequest
      .findMany({
        orderBy: { submittedAt: 'desc' }
      })
      .catch(() => []),
    prisma.concert
      .findMany({
        orderBy: { createdAt: 'desc' }
      })
      .catch(() => []),
    prisma.venue
      .findMany({
        orderBy: { name: 'asc' }
      })
      .catch(() => []),
    prisma.teamMember
      .findMany({
        orderBy: { updatedAt: 'desc' }
      })
      .catch(() => []),
    prisma.news
      .findMany({
        orderBy: { createdAt: 'desc' }
      })
      .catch(() => []),
    prisma.event
      .findMany({
        orderBy: { date: 'desc' }
      })
      .catch(() => []),
    prisma.testimonial
      .findMany({
        orderBy: { displayOrder: 'asc' }
      })
      .catch(() => []),
    prisma.sponsor
      .findMany({
        orderBy: { name: 'asc' }
      })
      .catch(() => []),
    prisma.question
      .findMany({
        orderBy: { createdAt: 'desc' }
      })
      .catch(() => []),
    prisma.user
      .findMany({
        orderBy: { email: 'asc' }
      })
      .catch(() => []),
    getDatabaseHealth()
  ])

  return {
    customRequests,
    concerts,
    venues,
    teamMembers,
    news,
    events,
    testimonials,
    sponsors,
    questions,
    users,
    dbHealth
  }
}

export default async function SuperPage() {
  const session = await auth()

  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user
    .findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })
    .catch(() => null)

  if (user?.role !== 'SUPER_USER') redirect('/v2/dashboard')

  const data = await fetchSuperDashboardData()

  return (
    <SuperClient
      customRequests={data.customRequests}
      concerts={data.concerts}
      venues={data.venues}
      teamMembers={data.teamMembers}
      news={data.news}
      events={data.events}
      testimonials={data.testimonials}
      sponsors={data.sponsors}
      questions={data.questions}
      users={data.users}
      dbHealth={data.dbHealth}
    />
  )
}
