import prisma from '@/prisma/client'
import { getUserId } from '../lib/auth'

export async function getCurrentUser() {
  const userId = await getUserId()

  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      isAdmin: true,
      role: true,
      firstName: true,
      isSuperUser: true,
      isBackgroundMusicOn: true,
      isSoundEffectsOn: true,
      isSupporter: true,
      lastName: true,
      createdAt: true
    }
  })

  return user
}
