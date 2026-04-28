'use server'

import prisma from '@/prisma/client'
import { auth } from '../../auth'

export async function getCampApplicationsById() {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.campApplication
    .findMany({
      where: { id: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        Student: true,
        Address: true,
        Parent: true
      }
    })
    .catch(() => [])
}
