import { getConcerts } from '@/app/actions/getConcerts'
import AdminConcertsClient from '../../components/pages/AdminConcertsClient'

export default async function AdminConcertsPage() {
  const data = await getConcerts()
  return <AdminConcertsClient data={data} />
}
