import { getVenues } from '@/app/actions/getVenues'
import Venues from './page'

export default async function VenuesLayout() {
  const data = await getVenues()

  return <Venues data={data} />
}
