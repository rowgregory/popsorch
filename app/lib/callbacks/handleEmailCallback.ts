import prisma from '@/prisma/client'
import type { User } from 'next-auth'

export async function handleEmailCallback(user: User) {
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email! },
    include: { accounts: true }
  })

  if (!dbUser || (dbUser.role !== 'ADMIN' && dbUser.role !== 'SUPER_USER')) {
    return false
  }

  const existing = await prisma.account.findFirst({
    where: { userId: dbUser.id, provider: 'email' }
  })

  if (!existing) {
    await prisma.account.create({
      data: {
        userId: dbUser.id,
        type: 'email',
        provider: 'email',
        providerAccountId: user.email!
      }
    })
  }

  return true
}
