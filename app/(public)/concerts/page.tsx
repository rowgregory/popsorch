import { getConcerts } from '@/app/actions/getConcerts'
import ConcertsPageClient from '@/app/components/pages/ConcertsPageClient'

export default async function ConcertsPage() {
  const { concerts } = await getConcerts()

  return <ConcertsPageClient concerts={concerts} />
}
