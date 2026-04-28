import { getPage } from '@/app/lib/actions/page/getPage'
import { HiddenGemsClient } from './HiddenGemsClient'

export default async function HiddenGemsPage() {
  const data = await getPage('hidden-gems')
  return <HiddenGemsClient data={data} />
}
