import UsersClient from '@/app/components/pages/UsersClient'
import prisma from '@/prisma/client'

export default async function UsersPage() {
  const users = await prisma.user
    .findMany({
      where: { role: 'ADMIN' },
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return <UsersClient users={users} />
}
