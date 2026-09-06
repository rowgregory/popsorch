import { getVenues } from '@/app/lib/actions/venue/getVenues'
import { VenuesClient } from './VenuesClient'

export default async function VenuesLayout() {
  const venues = await getVenues()
  return <VenuesClient venues={venues} />
}
