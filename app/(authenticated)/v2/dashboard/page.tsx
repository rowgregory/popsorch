import DashboardClient from '@/app/components/pages/DashboardClient'
import { getDashboardData } from '@/app/lib/actions/getDashboardData'

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <DashboardClient
      concerts={data.concerts}
      venues={data.venues}
      teamMembers={data.teamMembers}
      photosCount={data.photosCount}
      questions={data.questions}
      users={data.users}
      mailchimpCount={data.mailchimpMemberCount.count}
      campApplicationsCount={data.campApplicationsCount}
      campApplications={data.campApplications}
      pageContentCount={data.pageContentCount}
      pages={data.pages}
      newsCount={data.newsCount}
      newsLiveCount={data.newsLiveCount}
      news={data.news}
      testimonialsCount={data.testimonialsCount}
      testimonialsLiveCount={data.testimonialsLiveCount}
      customRequests={data.customRequests}
      eventsCount={data.eventsCount}
      eventsLiveCount={data.eventsLiveCount}
      sponsors={data.sponsors}
      sponsorsActiveCount={data.sponsorsActiveCount}
    />
  )
}
