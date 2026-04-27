import prisma from '@/prisma/client'
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })

    return users
  } catch (error) {
    return {
      users: [],
      count: 0,
      noUsers: 0
    }
  }
}
