import DashboardClient from '@/app/components/v2/pages/DashboardClient'
import { getDashboardData } from '@/app/lib/actions/getDashboardData'

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <DashboardClient
      concerts={data.concerts}
      venues={data.venues}
      teamMembers={data.teamMembers}
      photosCount={data.photosCount}
      photosLiveCount={data.photosLiveCount}
      questions={data.questions}
      users={data.users}
      mailchimpCount={data.mailchimpCount}
      campApplicationsCount={data.campApplicationsCount}
      campApplications={data.campApplications}
      pageContentCount={data.pageContentCount}
      pages={data.pages}
      newsCount={data.newsCount}
      newsLiveCount={data.newsLiveCount}
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
