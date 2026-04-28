import { getTeamMemberByRole } from '@/app/lib/actions/team/getTeamMemberByRole'
import { MusiciansClient } from '../../components/pages/MusiciansClient'

export default async function MusiciansPage() {
  const data = await getTeamMemberByRole('MUSICIAN')
  return <MusiciansClient data={data} />
}
