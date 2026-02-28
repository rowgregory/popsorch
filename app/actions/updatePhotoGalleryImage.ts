'use server'

import { createLog } from '../utils/logHelper'
import prisma from '@/prisma/client'

export async function updatePhotoGalleryImage(id: string, isHomeHero: boolean) {
  try {
    const updatedPhotoGalleryImage = await prisma.photoGalleryImage.update({
      where: { id },
      data: { isHomeHero }
    })

    return { success: true, photoGalleryImage: updatedPhotoGalleryImage }
  } catch (error: any) {
    await createLog('error', `Updating photo gallery image failed: ${error.message}`, {
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString()
    })

    throw new Error(error.message)
  }
}
