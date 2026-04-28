import { getTeamMemberByRole } from '@/app/lib/actions/team/getTeamMemberByRole'
import { StaffClient } from './StaffClient'

export default async function StaffPage() {
  const staff = await getTeamMemberByRole('STAFF')
  return <StaffClient staff={staff} />
}
