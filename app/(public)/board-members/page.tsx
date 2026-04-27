import { getTeamMemberByRole } from '@/app/lib/actions/team/getTeamMemberByRole'
import { BoardMembersClient } from '../../components/pages/BoardMembersClient'

export default async function BoardMembersPage() {
  const data = await getTeamMemberByRole('Board-Member')
  return <BoardMembersClient data={data} />
}
