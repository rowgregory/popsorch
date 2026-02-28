'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export async function toggleConcertOnSale(concertId: string, isOnSale: boolean) {
  try {
    if (!concertId) {
      throw new Error('Concert ID is required')
    }

    const concert = await prisma.concert.update({
      where: { id: concertId },
      data: { isOnSale }
    })

    await createLog('info', 'Concert toggled successfully', {
      concertId: concert.id,
      isOnSale: concert.isOnSale,
      name: concert.name
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to toggle concert'

    await createLog('error', 'Failed to toggle concert', {
      error: errorMessage,
      inputData: {
        concertId,
        isOnSale
      }
    })

    throw new Error(errorMessage)
  }
}
