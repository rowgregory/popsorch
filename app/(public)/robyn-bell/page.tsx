import { getPage } from '@/app/lib/actions/page/getPage'
import { RobynBellClient } from './RobynBellClient'

export default async function RobynBellPage() {
  const data = await getPage('robyn-bell')
  return <RobynBellClient data={data} />
}
