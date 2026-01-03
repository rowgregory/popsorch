import { getConcerts } from '@/app/actions/getConcerts'
import Concerts from './page'

export default async function ConcertsLayout() {
  const data = await getConcerts()

  return <Concerts data={data} />
}
