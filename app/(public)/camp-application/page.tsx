import { getPage } from '@/app/lib/actions/page/getPage'
import CampApplicationClient from '../../components/pages/CampApplicationClient'

export default async function CampApplicationPage() {
  const data = await getPage('camp-application')
  return <CampApplicationClient data={data} />
}
