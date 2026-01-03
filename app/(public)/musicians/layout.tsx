import { getTeamMemberByRole } from '@/app/actions/getTeamMemberByRole'
import Musicians from './page'

export default async function MusicianLayout() {
  const musicians = await getTeamMemberByRole('Musician')
  return <Musicians musicians={musicians} />
}
