import { getPage } from '@/app/actions/getPage'
import AboutClient from '@/app/components/pages/AboutClient'

export default async function AboutPage() {
  const page = await getPage('about')
  return <AboutClient page={page} />
}
