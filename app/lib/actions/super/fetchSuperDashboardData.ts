import prisma from '@/prisma/client'
import { getDatabaseHealth } from './getDatabaseHealth'

import { unstable_cache } from 'next/cache'

export const getSuperDashboardData = unstable_cache(fetchSuperDashboardData, ['super-dashboard'], {
  revalidate: 60,
  tags: ['super-dashboard']
})

async function fetchSuperDashboardData() {
  const [customRequests, concerts, venues, teamMembers, news, events] = await Promise.all([
    prisma.customRequest.findMany({ orderBy: { submittedAt: 'desc' } }).catch(() => []),
    prisma.concert.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.venue.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    prisma.teamMember.findMany({ orderBy: { updatedAt: 'desc' } }).catch(() => []),
    prisma.news.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.event.findMany({ orderBy: { date: 'desc' } }).catch(() => [])
  ])

  const [testimonials, sponsors, questions, users, dbHealth] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []),
    prisma.sponsor.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    prisma.question.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.user.findMany({ orderBy: { email: 'asc' } }).catch(() => []),
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
