import { getCampApplicationsById } from '@/app/lib/actions/camp-applications/getCampApplicationsById'
import { getCampApplicationsSetting } from '@/app/lib/actions/camp-applications/getCampApplicationsSetting'
import SupporterOverviewClient from '@/app/components/pages/SupporterOverviewClient'
import { auth } from '@/app/lib/auth'

export default async function SupporterOverviewPage() {
  const session = await auth()
  const campApplicationsSetting = await getCampApplicationsSetting()
  const campApplications = await getCampApplicationsById()

  return (
    <SupporterOverviewClient
      user={session.user}
      isCampActive={campApplicationsSetting?.value}
      campApplications={campApplications}
    />
  )
}
