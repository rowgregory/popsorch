import { getPage } from '@/app/lib/actions/page/getPage'
import { ConnectWithUsClient } from '@/app/(public)/connect-with-us/ConnectWithUsClient'

export default async function ConnectWithUsPage() {
  const data = await getPage('connect-with-us')
  return <ConnectWithUsClient data={data} />
}
