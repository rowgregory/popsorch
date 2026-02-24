import { getPage } from '@/app/actions/getPage'
import PageContentEditorClient from '@/app/components/pages/PageContentEditorClient'

interface PageContentEditorProps {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function PageContentEditorPage({ searchParams }: PageContentEditorProps) {
  const params = await searchParams
  const slug = params.page
  const data = await getPage(slug)

  return <PageContentEditorClient data={data} />
}
