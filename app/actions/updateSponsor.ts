'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface UpdateSponsorInput {
  name?: string
  filePath?: string
  filename?: string
  externalLink?: string
  level?: string
  amount?: string
}

export async function updateSponsor(sponsorId: string, data: UpdateSponsorInput) {
  try {
    if (!sponsorId) {
      throw new Error('Sponsor ID is required')
    }

    const updateData: any = {}

    if (data.name) updateData.name = data.name
    if (data.filePath) updateData.filePath = data.filePath
    if (data.filename) updateData.filename = data.filename
    if (data.externalLink !== undefined) updateData.externalLink = data.externalLink
    if (data.level !== undefined) updateData.level = data.level
    if (data.amount !== undefined) updateData.amount = data.amount

    const sponsor = await prisma.sponsor.update({
      where: { id: sponsorId },
      data: updateData
    })

    await createLog('info', 'Sponsor updated successfully', {
      sponsorId: sponsor.id,
      name: sponsor.name,
      amount: sponsor.amount
    })

    revalidateTag('Sponsor', 'default')
    return { success: true, sponsor }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update sponsor'

    await createLog('error', 'Failed to update sponsor', {
      error: errorMessage,
      inputData: {
        sponsorId
      }
    })

    throw new Error(errorMessage)
  }
}
