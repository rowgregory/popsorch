import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getLogs = unstable_cache(
  async () => {
    return prisma.log.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
  },
  ['getDashboardLogs'],
  { tags: ['Log'] }
)
