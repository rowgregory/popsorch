import { getUser } from '@/app/actions/getUser'
import AdminProfile from './page'
import { auth } from '@/app/lib/auth'

export default async function ProfileLayout() {
  const session = await auth()
  const data = await getUser(session.user.id)
  return <AdminProfile data={data} />
}
