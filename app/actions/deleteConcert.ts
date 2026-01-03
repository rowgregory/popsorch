'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function deleteConcert(concertId: string) {
  try {
    if (!concertId) {
      throw new Error('Concert ID is required')
    }

    const concert = await prisma.concert.delete({
      where: { id: concertId }
    })

    await createLog('info', 'Concert deleted successfully', {
      concertId: concert.id,
      name: concert.name,
      type: concert.type
    })

    revalidateTag('Concert', 'default')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete concert'

    await createLog('error', 'Failed to delete concert', {
      error: errorMessage,
      inputData: {
        concertId
      }
    })

    throw new Error(errorMessage)
  }
}
