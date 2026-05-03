import PublicNewsClient from '@/app/(public)/news/PublicNewsClient'
import prisma from '@/prisma/client'

export default async function NewsPage() {
  const news = await prisma.news
    .findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return <PublicNewsClient news={news} />
}
