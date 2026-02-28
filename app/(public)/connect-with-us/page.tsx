import { getPage } from '@/app/actions/getPage'
import { ConnectWithUsClient } from '@/app/components/pages/ConnectWithUsClient'

export default async function ConnectWithUsPage() {
  const data = await getPage('connect-with-us')
  return <ConnectWithUsClient data={data} />
}
