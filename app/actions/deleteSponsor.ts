'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function deleteSponsor(sponsorId: string) {
  try {
    if (!sponsorId) {
      throw new Error('Sponsor ID is required')
    }

    const sponsor = await prisma.sponsor.delete({
      where: { id: sponsorId }
    })

    await createLog('info', 'Sponsor deleted successfully', {
      sponsorId: sponsor.id,
      name: sponsor.name
    })

    revalidateTag('Sponsor', 'default')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete sponsor'

    await createLog('error', 'Failed to delete sponsor', {
      error: errorMessage,
      inputData: {
        sponsorId
      }
    })

    throw new Error(errorMessage)
  }
}
