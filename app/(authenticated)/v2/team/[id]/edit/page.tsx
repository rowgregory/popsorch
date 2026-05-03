import TeamEditClient from '@/app/components/pages/TeamEditClient'
import { getTeamMemberById } from '@/app/lib/actions/team/getTeamMemberById'

export default async function TeamEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [teamMember] = await Promise.all([getTeamMemberById(id)])
  return <TeamEditClient teamMember={teamMember.data} />
}
