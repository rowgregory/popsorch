import { getPage } from '@/app/actions/getPage'
import PageContentEditorClient from '@/app/components/pages/PageContentEditorClient'

interface PageContentEditorProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function PageContentEditorPage({ searchParams }: PageContentEditorProps) {
  const { page } = await searchParams
  const data = await getPage(page)
  return <PageContentEditorClient data={data} />
}
