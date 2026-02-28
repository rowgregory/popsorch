import { getPage } from '@/app/actions/getPage'
import { AdvertiseWithUsClient } from '@/app/components/pages/AdvertiseWithUsClient'

export default async function AdvertiseWithUsPage() {
  const data = await getPage('advertise-with-us')
  return <AdvertiseWithUsClient data={data?.content} />
}
