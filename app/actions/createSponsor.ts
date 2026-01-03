'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface CreateSponsorInput {
  name: string
  filePath: string
  filename: string
  externalLink?: string
  level?: string
  amount?: string
}

export async function createSponsor(data: CreateSponsorInput) {
  try {
    if (!data.name) {
      throw new Error('Sponsor name is required')
    }

    if (!data.filePath || !data.filename) {
      throw new Error('Sponsor image is required')
    }

    const sponsor = await prisma.sponsor.create({
      data: {
        name: data.name,
        filePath: data.filePath,
        filename: data.filename,
        externalLink: data.externalLink || '',
        level: data.level || '',
        amount: data.amount || ''
      }
    })

    await createLog('info', 'Sponsor created successfully', {
      sponsorId: sponsor.id,
      name: sponsor.name,
      level: sponsor.level,
      amount: sponsor.amount
    })

    revalidateTag('Sponsor', 'default')
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create sponsor'

    await createLog('error', 'Failed to create sponsor', {
      error: errorMessage,
      inputData: {
        name: data.name,
        level: data.level,
        amount: data.amount
      }
    })

    throw new Error(errorMessage)
  }
}
