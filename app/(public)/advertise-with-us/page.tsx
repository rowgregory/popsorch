import { getPage } from '@/app/lib/actions/page/getPage'
import { AdvertiseWithUsClient } from '@/app/(public)/advertise-with-us/AdvertiseWithUsClient'

export default async function AdvertiseWithUsPage() {
  const data = await getPage('advertise-with-us')
  return <AdvertiseWithUsClient data={data?.content} />
}
