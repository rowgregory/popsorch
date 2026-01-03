import { getTeamMemberByRole } from '@/app/actions/getTeamMemberByRole'
import BoardMembers from './page'

export default async function BoardMemberLayout() {
  const boardMembers = await getTeamMemberByRole('Board-Member')

  return <BoardMembers boardMembers={boardMembers} />
}
