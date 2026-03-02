import { getPage } from '@/app/actions/getPage'
import { SponsorshipOpportunitiesClient } from '../../components/pages/SponsorshipOpportunitiesClient'

export default async function SponsorshipOpportunitiesPage() {
  const data = await getPage('sponsorship-opportunities')
  return <SponsorshipOpportunitiesClient data={data} />
}
