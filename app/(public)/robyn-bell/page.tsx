import { getPage } from '@/app/actions/getPage'
import { RobynBellClient } from '../../components/pages/RobynBellClient'

export default async function RobynBellPage() {
  const data = await getPage('robyn-bell')
  return <RobynBellClient data={data} />
}
