import { getPage } from '@/app/actions/getPage'
import TheCauldronClient from '@/app/components/pages/TheCauldronClient'

interface TheCauldronPageProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function TheCauldronPage({ searchParams }: TheCauldronPageProps) {
  const params = await searchParams
  const slug = params.page
  const data = await getPage(slug)

  return <TheCauldronClient data={data} />
}
