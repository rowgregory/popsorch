import getHostGatorCredentials from '@/app/actions/getHostGatorCredentials'
import DashboardClient from '../../components/pages/DashboardClient'
import getGoogleAnalyticsCredentials from '@/app/actions/getGoogleAnalyticsCredentials'
import getMailChimpCredentials from '@/app/actions/getMailChimpCredentials'

export default async function DashboardPage() {
  const googleAnalyticsCredentials = await getGoogleAnalyticsCredentials()
  const hostGatorCredentials = await getHostGatorCredentials()
  const mailChimpCredentials = await getMailChimpCredentials()
  return (
    <DashboardClient
      googleAnalyticsCredentials={googleAnalyticsCredentials}
      hostGatorCredentials={hostGatorCredentials}
      mailChimpCredentials={mailChimpCredentials}
    />
  )
}
