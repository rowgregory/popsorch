import DashboardClient from '../../components/pages/DashboardClient'
import getGoogleAnalyticsCredentials from '@/app/actions/getGoogleAnalyticsCredentials'

export default async function DashboardPage() {
  const googleAnalyticsCredentials = await getGoogleAnalyticsCredentials()
  return <DashboardClient googleAnalyticsCredentials={googleAnalyticsCredentials} />
}
