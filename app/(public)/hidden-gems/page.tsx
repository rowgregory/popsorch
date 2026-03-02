import { getPage } from '@/app/actions/getPage'
import { HiddenGemsClient } from '../../components/pages/HiddenGemsClient'

export default async function HiddenGemsPage() {
  const data = await getPage('hidden-gems')
  return <HiddenGemsClient data={data} />
}
