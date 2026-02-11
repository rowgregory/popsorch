'use server'

import prisma from '@/prisma/client'

export const getSupporterData = async (email: string) => {
  const [user, questions, newsletter, campApplication] = await Promise.all([
    prisma.user.findUnique({
      where: { email }
    }),
    prisma.question.findMany({
      where: { email },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.newsletter.findUnique({
      where: { email }
    }),
    prisma.campApplication.findFirst({
      where: {
        student: {
          studentEmailAddress: email
        }
      },
      include: {
        student: true,
        address: true,
        parent: true
      }
    })
  ])

  return { user, questions, newsletter, campApplication }
}
