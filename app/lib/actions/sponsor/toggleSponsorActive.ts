import prisma from '@/prisma/client'
import { getActor } from '../user/getActor'
import { buildLogMessage, getRequestContext } from '@/app/utils/parseUserAgent'
import { createLog } from '@/app/utils/logHelper'
import { revalidateTag } from 'next/cache'

export async function toggleSponsorActive(id: string, isActive: boolean) {
  if (!id) return { success: false, error: 'Sponsor ID is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const sponsor = await prisma.sponsor
    .update({
      where: { id },
      data: { isActive }
    })
    .catch(() => null)

  if (!sponsor) return { success: false, error: 'Failed to update sponsor' }

  await createLog(
    'info',
    await buildLogMessage(`${isActive ? 'activated' : 'deactivated'} sponsor "${sponsor.name}"`, actor, context),
    {
      sponsorId: sponsor.id,
      name: sponsor.name,
      isActive,
      updatedBy: actor,
      request: context
    }
  ).catch(() => null)

  revalidateTag('dashboard', 'default')

  return { success: true, data: sponsor }
}
