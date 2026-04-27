'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { getActor } from '../user/getActor'
import { CreateSponsorInput } from '../../../types/entities/sponsor'

export async function createSponsor(data: CreateSponsorInput) {
  if (!data.name) return { success: false, error: 'Sponsor name is required' }
  if (!data.filePath || !data.filename) return { success: false, error: 'Sponsor image is required' }

  const actor = await getActor()

  const sponsor = await prisma.sponsor
    .create({
      data: {
        name: data.name,
        filePath: data.filePath,
        filename: data.filename,
        externalLink: data.externalLink ?? '',
        level: data.level,
        amount: data.amount ?? 0,
        isActive: data.isActive ?? true
      }
    })
    .catch((e) => {
      console.error('Prisma error:', e)
      return null
    })

  if (!sponsor) return { success: false, error: 'Failed to create sponsor' }

  await createLog('info', `Sponsor "${sponsor.name}" created`, {
    sponsorId: sponsor.id,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: sponsor }
}
