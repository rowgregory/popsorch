import { getUser } from '@/app/actions/getUser'
import { getUserId } from '@/app/actions/getUserById'
import AdminProfile from './page'

export default async function ProfileLayout() {
  const userId = await getUserId()
  const data = await getUser(userId)
  return <AdminProfile data={data} />
}
