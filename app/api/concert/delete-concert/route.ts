import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceConcert } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const { id, imageFilename } = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    if (imageFilename) {
      try {
        await deleteFileFromFirebase(imageFilename, 'image')
      } catch (firebaseError: any) {
        await createLog('error', `Failed to delete concert image from Firebase: ${firebaseError.message}`, {
          errorLocation: parseStack(JSON.stringify(firebaseError)),
          errorMessage: firebaseError.message,
          errorName: firebaseError.name || 'FirebaseError',
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
          user: parsedUser
        })
        throw new Error('Firebase deletion failed, aborting.')
      }
    }

    await prisma.concert.delete({
      where: { id }
    })

    await createLog('info', 'Concert deleted', {
      location: ['concert route - DELETE /api/camp/delete-concert'],
      message: `Concert successfully deleted`,
      name: 'ConcertDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceConcert }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting concert failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error deleting concert', error, sliceName: sliceConcert }, { status: 500 })
  }
}
