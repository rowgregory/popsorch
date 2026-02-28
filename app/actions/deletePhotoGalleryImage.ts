'use server'

import deleteFileFromFirebase from '../utils/firebase.delete'
import { createLog } from '../utils/logHelper'
import prisma from '@/prisma/client'

export async function deletePhotoGalleryImage(id: string, imageFilename: string) {
  try {
    try {
      await deleteFileFromFirebase(imageFilename, 'image')
    } catch (firebaseError: any) {
      await createLog('error', `Failed to delete image from Firebase: ${firebaseError.message}`, {
        errorMessage: firebaseError.message,
        errorName: firebaseError.name || 'FirebaseError',
        timestamp: new Date().toISOString()
      })
      throw new Error(`Failed to delete image from Firebase: ${firebaseError.message}`)
    }

    await prisma.photoGalleryImage.delete({
      where: { id }
    })

    await createLog('info', 'Photo gallery image deleted successfully', {
      id,
      imageFilename,
      timestamp: new Date().toISOString()
    })

    return { success: true, id }
  } catch (error: any) {
    await createLog('error', `Deleting photo failed: ${error.message}`, {
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString()
    })

    throw new Error(error.message)
  }
}
