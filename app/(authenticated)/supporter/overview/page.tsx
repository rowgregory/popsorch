import { getCampApplicationsById } from '@/app/actions/getCampApplicationsById'
import { getCampApplicationsSetting } from '@/app/actions/getCampApplicationsSetting'
import { getNewsletterSubscriptionStatus } from '@/app/actions/getNewsletterSubscriptionStatus'
import SupporterOverviewClient from '@/app/components/pages/SupporterOverviewClient'
import { auth } from '@/app/lib/auth'

export default async function SupporterOverviewPage() {
  const session = await auth()
  const campApplicationsSetting = await getCampApplicationsSetting()
  const campApplications = await getCampApplicationsById()
  const newsletterStatus = await getNewsletterSubscriptionStatus()

  return (
    <SupporterOverviewClient
      isSubscribed={newsletterStatus?.isSubscribed}
      user={session.user}
      isCampActive={campApplicationsSetting?.value}
      campApplications={campApplications}
    />
  )
}
