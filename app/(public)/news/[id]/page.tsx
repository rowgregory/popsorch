import NewsDetailsClient from '@/app/components/v2/pages/NewsDetailsClient'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

export default async function NewsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.news
    .findUnique({
      where: { id }
    })
    .catch(() => null)

  if (!article || !article.isPublished) notFound()

  return <NewsDetailsClient article={article} />
}
