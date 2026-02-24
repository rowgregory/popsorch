import CampApplicationClient from '../../components/pages/CampApplicationClient'
import { getPageContent } from '@/app/actions/getPageContent'

export default async function CampApplicationPage() {
  const data = await getPageContent('camp-application')
  return <CampApplicationClient data={data} />
}
