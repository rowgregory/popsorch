import { getPage } from '@/app/lib/actions/page/getPage'
import { SponsorshipOpportunitiesClient } from './SponsorshipOpportunitiesClient'

export default async function SponsorshipOpportunitiesPage() {
  const data = await getPage('sponsorship-opportunities')
  return <SponsorshipOpportunitiesClient data={data} />
}
