import { getVenues } from '@/app/actions/getVenues'
import Venues from './page'

export default async function VenuesLayout() {
  const venues = await getVenues()
  return <Venues venues={venues} />
}
