import prisma from '@/prisma/client'

export async function getSponsors() {
  const sponsors = await prisma.sponsor
    .findMany({
      orderBy: [{ createdAt: 'desc' }]
    })
    .catch(() => [])

  return { success: true, data: sponsors }
}
