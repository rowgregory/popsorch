import { getConcerts } from '@/app/actions/getConcerts'
import { ConcertsClient } from '@/app/components/pages/ConcertsClient'

export default async function ConcertsPage() {
  const { concerts } = await getConcerts()
  return <ConcertsClient concerts={concerts} />
}
