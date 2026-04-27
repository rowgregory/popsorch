import prisma from '@/prisma/client'

export const getConcertById = async (id: string) => {
  const concert = await prisma.concert
    .findUnique({
      where: { id },
      include: {
        shows: {
          include: { venue: true },
          orderBy: { date: 'asc' }
        }
      }
    })
    .catch(() => null)

  return concert
}
