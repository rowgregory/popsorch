import { getConcerts } from '@/app/actions/getConcerts'
import ConcertsPage from '@/app/(public)/concerts/page'

export default async function ConcertsLayout() {
  const { concerts } = await getConcerts()
  return <ConcertsPage concerts={concerts} />
}
