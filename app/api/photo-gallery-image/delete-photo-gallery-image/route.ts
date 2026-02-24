import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()
    const { id, imageFilename } = body

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    try {
      await deleteFileFromFirebase(imageFilename, 'image')
    } catch (firebaseError: any) {
      await createLog('error', `Failed to delete image from Firebase: ${firebaseError.message}`, {
        errorLocation: parseStack(JSON.stringify(firebaseError)),
        errorMessage: firebaseError.message,
        errorName: firebaseError.name || 'FirebaseError',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
        user: parsedUser
      })
      return NextResponse.json({ message: 'Error deleting photo from firebase', error: firebaseError }, { status: 500 })
    }

    await prisma.photoGalleryImage.delete({
      where: { id }
    })

    return NextResponse.json({ id }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting photo failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error deleting photo', error }, { status: 500 })
  }
}
