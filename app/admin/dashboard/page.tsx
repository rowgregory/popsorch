import getHostGatorCredentials from '@/app/actions/getHostGatorCredentials'
import DashboardClient from '../../components/pages/DashboardClient'
import getGoogleAnalyticsCredentials from '@/app/actions/getGoogleAnalyticsCredentials'
import getMailChimpCredentials from '@/app/actions/getMailChimpCredentials'
import getResendCredentials from '@/app/actions/getResendCredentials'

export default async function DashboardPage() {
  const googleAnalyticsCredentials = await getGoogleAnalyticsCredentials()
  const hostGatorCredentials = await getHostGatorCredentials()
  const mailChimpCredentials = await getMailChimpCredentials()
  const resendCredentials = await getResendCredentials()
  return (
    <DashboardClient
      googleAnalyticsCredentials={googleAnalyticsCredentials}
      hostGatorCredentials={hostGatorCredentials}
      mailChimpCredentials={mailChimpCredentials}
      resendCredentials={resendCredentials}
    />
  )
}
