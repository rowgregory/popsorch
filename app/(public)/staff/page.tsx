import { getTeamMemberByRole } from '@/app/lib/actions/team/getTeamMemberByRole'
import { StaffClient } from '../../components/pages/StaffClient'

export default async function StaffPage() {
  const staff = await getTeamMemberByRole('Staff')
  return <StaffClient staff={staff} />
}
