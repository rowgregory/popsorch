'use server'

import prisma from '@/prisma/client'

export async function deleteGalleryPhoto(id: string) {
  if (!id) return { success: false, error: 'Photo ID is required' }

  const photo = await prisma.photoGalleryImage
    .delete({
      where: { id }
    })
    .catch(() => null)

  if (!photo) return { success: false, error: 'Failed to delete photo' }

  return { success: true }
}
