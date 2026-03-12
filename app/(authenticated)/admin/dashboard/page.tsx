import getHostGatorCredentials from '@/app/actions/getHostGatorCredentials'
import getGoogleAnalyticsCredentials from '@/app/actions/getGoogleAnalyticsCredentials'
import getMailChimpCredentials from '@/app/actions/getMailChimpCredentials'
import getResendCredentials from '@/app/actions/getResendCredentials'
import getGoogleFirebaseCredentials from '@/app/actions/getGoogleFirebaseCredentials'
import DashboardClient from '@/app/components/pages/DashboardClient'

export default async function DashboardPage() {
  const googleAnalyticsCredentials = await getGoogleAnalyticsCredentials()
  const hostGatorCredentials = await getHostGatorCredentials()
  const mailChimpCredentials = await getMailChimpCredentials()
  const resendCredentials = await getResendCredentials()
  const googleFirebaseCredentials = await getGoogleFirebaseCredentials()
  return (
    <DashboardClient
      googleAnalyticsCredentials={googleAnalyticsCredentials}
      hostGatorCredentials={hostGatorCredentials}
      mailChimpCredentials={mailChimpCredentials}
      resendCredentials={resendCredentials}
      googleFirebaseCredentials={googleFirebaseCredentials}
    />
  )
}
