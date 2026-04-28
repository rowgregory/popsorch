import { getPage } from '@/app/lib/actions/page/getPage'
import { AboutClient } from '@/app/(public)/about/AboutClient'

export default async function AboutPage() {
  const data = await getPage('about')
  return <AboutClient data={data?.content} />
}
