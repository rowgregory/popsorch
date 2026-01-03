import { getPage } from '@/app/actions/getPage'
import TheCauldron from './page'

export default async function TheCauldronLayout() {
  const data = await getPage('home')
  return <TheCauldron data={data} />
}
