import { getLogs } from '@/app/actions/getLogs'
import LogsClient from '@/app/components/pages/LogsClient'

export default async function LogsPage() {
  const data = await getLogs()
  return <LogsClient data={data} />
}
