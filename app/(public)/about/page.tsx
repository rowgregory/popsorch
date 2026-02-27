import { getPage } from '@/app/actions/getPage'
import { AboutClient } from '@/app/components/pages/AboutClient'

export default async function AboutPage() {
  const data = await getPage('about')
  return <AboutClient data={data?.content} />
}
