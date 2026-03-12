'use server'

import prisma from '@/prisma/client'
import { auth } from '../lib/auth'

export async function getCampApplicationsById() {
  const session = await auth()
  if (!session?.user?.id) return []

  return prisma.campApplication.findMany({
    where: { id: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      student: true,
      address: true,
      parent: true
    }
  })
}
