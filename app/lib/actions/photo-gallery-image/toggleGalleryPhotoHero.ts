'use server'

import prisma from '@/prisma/client'

export async function toggleGalleryPhotoHero(id: string, current: boolean) {
  if (!id) return { success: false, error: 'Photo ID is required' }

  const photo = await prisma.photoGalleryImage
    .update({
      where: { id },
      data: { isHomeHero: !current }
    })
    .catch(() => null)

  if (!photo) return { success: false, error: 'Failed to update photo' }

  return { success: true, data: photo }
}
