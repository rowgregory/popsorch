'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'
import { UpdateSponsorInput } from '@/app/types/entities/sponsor'
import { getActor } from '../user/getActor'

export async function updateSponsor(id: string, data: UpdateSponsorInput) {
  if (!id) return { success: false, error: 'Sponsor ID is required' }

  const actor = await getActor()

  const sponsor = await prisma.sponsor
    .update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.filePath !== undefined && { filePath: data.filePath }),
        ...(data.filename !== undefined && { filename: data.filename }),
        ...(data.externalLink !== undefined && { externalLink: data.externalLink }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.amount !== undefined && { amount: Math.round(data.amount) }),
        ...(data.isActive !== undefined && { isActive: data.isActive })
      }
    })
    .catch(() => null)

  if (!sponsor) return { success: false, error: 'Failed to update sponsor' }

  await createLog('info', `Sponsor "${sponsor.name}" updated`, {
    sponsorId: sponsor.id,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: sponsor }
}
