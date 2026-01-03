import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getUsers = unstable_cache(
  async () => {
    try {
      const users = await prisma.user.findMany()

      return {
        users,
        count: users.length,
        noUsers: users.length === 0
      }
    } catch (error) {
      return {
        users: [],
        count: 0,
        noUsers: 0
      }
    }
  },
  ['getUsers'],
  {
    tags: ['User']
  }
)
