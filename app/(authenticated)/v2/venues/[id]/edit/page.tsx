import VenueEditClient from '@/app/components/v2/pages/VenueEditClient'
import { getVenueById } from '@/app/lib/actions/venue/getVenueById'

export default async function VenueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [venue] = await Promise.all([getVenueById(id)])
  return <VenueEditClient venue={venue.data} />
}
