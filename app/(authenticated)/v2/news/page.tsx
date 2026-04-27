import NewsClient from '@/app/components/v2/pages/NewsClient'
import prisma from '@/prisma/client'

export default async function NewsPage() {
  const news = await prisma.news
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return <NewsClient news={news} />
}
