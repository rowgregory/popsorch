import { getTeamMemberByRole } from '@/app/actions/getTeamMemberByRole'
import { BoardMembersClient } from '../../components/pages/BoardMembersClient'

export default async function BoardMembersPage() {
  const data = await getTeamMemberByRole('Board-Member')
  return <BoardMembersClient data={data} />
}
