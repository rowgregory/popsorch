import { getPage } from '@/app/actions/getPage'
import { ChairSponsorshipsClient } from '@/app/components/pages/ChairSponsorshipsClient'

export default async function CampApplicationPage() {
  const data = await getPage('chair-sponsorships')
  return <ChairSponsorshipsClient data={data} />
}
