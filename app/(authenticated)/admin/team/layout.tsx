import { getTeamMembers } from '@/app/actions/getTeamMembers'
import Team from './page'

export default async function TeamMemberLayout() {
  const data = await getTeamMembers()

  return <Team data={data} />
}
