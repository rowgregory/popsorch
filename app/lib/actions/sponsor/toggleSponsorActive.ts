import prisma from '@/prisma/client'

export async function toggleSponsorActive(id: string, isActive: boolean) {
  if (!id) return { success: false, error: 'Sponsor ID is required' }

  const sponsor = await prisma.sponsor
    .update({
      where: { id },
      data: { isActive }
    })
    .catch(() => null)

  if (!sponsor) return { success: false, error: 'Failed to update sponsor' }

  return { success: true, data: sponsor }
}
