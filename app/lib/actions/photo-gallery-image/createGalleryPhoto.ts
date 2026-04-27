'use server'

import prisma from '@/prisma/client'

export async function createGalleryPhoto({ imageUrl, imageFilename }: { imageUrl: string; imageFilename: string }) {
  if (!imageUrl || !imageFilename) return { success: false, error: 'Image is required' }

  const photo = await prisma.photoGalleryImage
    .create({
      data: { imageUrl, imageFilename }
    })
    .catch(() => null)

  if (!photo) return { success: false, error: 'Failed to save photo' }

  return { success: true, data: photo }
}
