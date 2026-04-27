import DashboardClient from '@/app/components/v2/pages/DashboardClient'
import prisma from '@/prisma/client'

export default async function DashboardPage() {
  const [
    concerts,
    venues,
    teamMembers,
    photosCount,
    photosLiveCount,
    questions,
    users,
    campApplications,
    pages,
    newsCount,
    newsLiveCount,
    testimonialsCount,
    testimonialsLiveCount,
    customRequests,
    eventsCount,
    eventsLiveCount,
    sponsors,
    sponsorsActiveCount
  ] = await Promise.all([
    prisma.concert.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.venue.findMany({ orderBy: { name: 'asc' } }).catch(() => []),
    prisma.teamMember.findMany({ orderBy: { displayOrder: 'asc' } }).catch(() => []),
    prisma.photoGalleryImage.count().catch(() => 0),
    prisma.photoGalleryImage.count({ where: { isHomeHero: true } }).catch(() => 0),
    prisma.question.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []),
    prisma.user.findMany({ orderBy: { firstName: 'asc' } }).catch(() => []),
    prisma.campApplication
      .findMany({ include: { Student: true, Parent: true, Address: true }, orderBy: { createdAt: 'asc' } })
      .catch(() => []),
    prisma.page.findMany({ orderBy: { createdAt: 'asc' } }).catch(() => []),
    prisma.news.count().catch(() => 0),
    prisma.news.count({ where: { isPublished: true } }).catch(() => 0),
    prisma.testimonial.count().catch(() => 0),
    prisma.testimonial.count({ where: { isPublished: true } }).catch(() => 0),
    prisma.customRequest.findMany({ orderBy: { submittedAt: 'desc' } }).catch(() => []),
    prisma.event.count().catch(() => 0),
    prisma.event.count({ where: { status: 'PUBLISHED' } }).catch(() => 0),
    prisma.sponsor.findMany({ orderBy: [{ createdAt: 'asc' }, { createdAt: 'desc' }] }).catch(() => []),
    prisma.sponsor.count().catch(() => 0)
  ])

  return (
    <DashboardClient
      concerts={concerts}
      venues={venues}
      teamMembers={teamMembers}
      photosCount={photosCount}
      photosLiveCount={photosLiveCount}
      questions={questions}
      users={users}
      mailchimpCount={9827} // TODO: fetch from Mailchimp API
      campApplicationsCount={campApplications?.length}
      campApplications={campApplications}
      pageContentCount={pages?.length}
      pages={pages}
      newsCount={newsCount}
      newsLiveCount={newsLiveCount}
      testimonialsCount={testimonialsCount}
      testimonialsLiveCount={testimonialsLiveCount}
      customRequests={customRequests}
      eventsCount={eventsCount}
      eventsLiveCount={eventsLiveCount}
      sponsors={sponsors}
      sponsorsActiveCount={sponsorsActiveCount}
    />
  )
}
