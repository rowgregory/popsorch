import { getTeamMemberByRole } from '@/app/actions/getTeamMemberByRole'
import Staff from './page'

export default async function BoardMemberLayout() {
  const staff = await getTeamMemberByRole('Staff')
  return <Staff staff={staff} />
}
