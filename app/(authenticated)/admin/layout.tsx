import { getCampApplications } from '@/app/actions/getCampApplications'
import { getHeaderButtons } from '@/app/actions/getHeaderButtons'
import { getUser } from '@/app/actions/getUser'
import { getVenues } from '@/app/actions/getVenues'
import AdminLayoutClient from '@/app/components/pages/AdminLayoutClient'
import { auth } from '@/app/lib/auth'

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
