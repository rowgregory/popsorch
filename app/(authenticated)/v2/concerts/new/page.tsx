import { getVenues } from '@/app/lib/actions/venue/getVenues'
import ConcertCreateClient from '@/app/components/v2/pages/ConcertCreateClient'

export default async function ConcertCreatePage() {
  const [venues] = await Promise.all([getVenues()])
  return <ConcertCreateClient venues={venues} />
}
