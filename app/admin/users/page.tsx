import { getUsers } from '@/app/actions/getUsers'
import { AdminUsersClient } from '@/app/components/pages/AdminUsersClient'

export default async function UsersLayout() {
  const data = await getUsers()
  return <AdminUsersClient users={data} />
}
