import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

const fetchUserData = async (userId: string | null) => {
  if (!userId) return null
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      firstName: true,
      isBackgroundMusicOn: true,
      isSoundEffectsOn: true,
      lastName: true,
      updatedAt: true
    }
  })
}

export const getUser = unstable_cache(
  async (id: string) => {
    try {
      const user = await fetchUserData(id)

      return { ...user, isAuthenticated: user.id ? true : false }
    } catch {
      return null
    }
  },
  ['getUser'],
  {
    tags: ['User']
  }
)
