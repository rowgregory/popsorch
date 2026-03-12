import { getSponsors } from '@/app/actions/getSponsors'
import AdminSponsors from './page'

export default async function SponsorsLayout() {
  const data = await getSponsors()

  return <AdminSponsors data={data} />
}
