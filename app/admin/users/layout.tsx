import { getUsers } from '@/app/actions/getUsers'
import Users from './page'

export default async function UsersLayout() {
  const data = await getUsers()

  return <Users data={data} />
}
