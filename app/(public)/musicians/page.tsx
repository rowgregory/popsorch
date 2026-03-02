import { getTeamMemberByRole } from '@/app/actions/getTeamMemberByRole'
import { MusiciansClient } from '../../components/pages/MusiciansClient'

export default async function MusiciansPage() {
  const data = await getTeamMemberByRole('Musician')
  return <MusiciansClient data={data} />
}
