import { getVenues } from '@/app/actions/getVenues'
import { AdminVenuesClient } from '../../components/pages/AdminVenuesClient'

export default async function AdminVenuesPage() {
  const data = await getVenues()

  return <AdminVenuesClient data={data} />
}
