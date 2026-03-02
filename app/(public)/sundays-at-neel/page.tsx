import { getConcertsByType } from '@/app/actions/getConcertsByType'
import { getPage } from '@/app/actions/getPage'
import { SundaysAtNeelClient } from '@/app/components/pages/SundaysAtNeelClient'

export default async function SundaysAtNeelLayout() {
  const { concerts } = await getConcertsByType('Sundays-at-Neel')
  const data = await getPage('sundays-at-neel')
  return <SundaysAtNeelClient concerts={concerts} data={data} />
}
