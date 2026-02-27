'use server'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

interface CreatePhotoGalleryImageInput {
  imageUrl: string
  imageFilename: string
  isHomeHero?: boolean
}

export async function createPhotoGalleryImage(data: CreatePhotoGalleryImageInput) {
  try {
    const image = await prisma.photoGalleryImage.create({
      data: {
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        isHomeHero: data.isHomeHero ?? false
      }
    })

    revalidatePath('/')
    revalidatePath('/admin/photo-gallery')

    return { success: true, data: image }
  } catch (error) {
    console.error('[createPhotoGalleryImage]', error)
    return { success: false, error: 'Failed to create photo gallery image.' }
  }
}
