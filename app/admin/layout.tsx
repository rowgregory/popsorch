import { getHeaderButtons } from '../actions/getHeaderButtons'
import { getUser } from '../actions/getUser'
import AdminClientLayout from '../components/pages/AdminLayoutClient'
import { auth } from '../lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const data = await getUser(session.user.id)
  const buttons = await getHeaderButtons()

  return (
    <AdminClientLayout data={data} buttons={buttons}>
      {children}
    </AdminClientLayout>
  )
}
