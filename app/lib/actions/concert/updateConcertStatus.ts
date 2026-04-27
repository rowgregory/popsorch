'use server'

import prisma from '@/prisma/client'
import { ConcertStatus } from '@prisma/client'

export async function updateConcertStatus(id: string, status: ConcertStatus) {
  if (!id) return { success: false, error: 'Concert ID is required' }

  const concert = await prisma.concert
    .update({
      where: { id },
      data: { status }
    })
    .catch(() => null)

  if (!concert) return { success: false, error: 'Failed to update status' }

  return { success: true, data: concert }
}
