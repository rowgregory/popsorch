import { getCampApplications } from '../actions/getCampApplications'
import { getHeaderButtons } from '../actions/getHeaderButtons'
import { getUser } from '../actions/getUser'
import { getVenues } from '../actions/getVenues'
import AdminLayoutClient from '../components/pages/AdminLayoutClient'
import { auth } from '../lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const data = await getUser(session.user.id)
  const buttons = await getHeaderButtons()
  const campApplications = await getCampApplications()
  const venues = await getVenues()
  return (
    <AdminLayoutClient data={data} buttons={buttons} campApplications={campApplications} venues={venues}>
      {children}
    </AdminLayoutClient>
  )
}
