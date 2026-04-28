import { getPage } from '@/app/lib/actions/page/getPage'
import { ChairSponsorshipsClient } from '@/app/(public)/chair-sponsorships/ChairSponsorshipsClient'

export default async function CampApplicationPage() {
  const data = await getPage('chair-sponsorships')
  return <ChairSponsorshipsClient data={data} />
}
