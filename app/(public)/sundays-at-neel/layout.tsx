import { getConcertsByType } from '@/app/actions/getConcertsByType'
import SundaysAtNeel from './page'

export default async function SundaysAtNeelLayout() {
  const { concerts } = await getConcertsByType('Sundays-at-Neel')
  return <SundaysAtNeel concerts={concerts} />
}
