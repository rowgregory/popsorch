'use server'

import prisma from '@/prisma/client'

interface CreatePhotoGalleryImageInput {
  imageUrl: string
  imageFilename: string
  isHomeHero?: boolean
}

export async function createPhotoGalleryImage(data: CreatePhotoGalleryImageInput) {
  try {
    await prisma.photoGalleryImage.create({
      data: {
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        isHomeHero: data.isHomeHero ?? false
      }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to create photo gallery image.' }
  }
}
