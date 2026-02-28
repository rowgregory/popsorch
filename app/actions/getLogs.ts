import prisma from '@/prisma/client'

export const getLogs = async () => {
  return prisma.log.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  })
}
