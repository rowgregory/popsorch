import { getHeaderButtons } from '../actions/getHeaderButtons'
import { getUser } from '../actions/getUser'
import { getUserId } from '../actions/getUserById'
import AdminClientLayout from './AdminLayoutClient'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const userId = await getUserId()
  const data = await getUser(userId)
  const buttons = await getHeaderButtons()

  return (
    <AdminClientLayout data={data} buttons={buttons}>
      {children}
    </AdminClientLayout>
  )
}
