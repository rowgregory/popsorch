import PageContentEditorClient from '@/app/components/pages/PageContentEditorClient'
import prisma from '@/prisma/client'

export default async function PageContentEditorPage({ searchParams }) {
  const { slug } = await searchParams
  const pages = await prisma.page
    .findMany({
      orderBy: { slug: 'asc' }
    })
    .catch(() => [])

  return <PageContentEditorClient pages={pages} slug={slug} />
}
