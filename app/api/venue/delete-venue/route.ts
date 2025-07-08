import deleteFileFromFirebase from '@/app/utils/firebase.delete'
import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceVenue } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()
    const { id, imageFilename } = body

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    if (imageFilename) {
      try {
        // Attempt to delete the image from Firebase
        await deleteFileFromFirebase(imageFilename, 'image')
      } catch (firebaseError: any) {
        // Log the error if Firebase deletion fails
        await createLog('error', `Failed to delete venue image from Firebase: ${firebaseError.message}`, {
          errorLocation: parseStack(JSON.stringify(firebaseError)),
          errorMessage: firebaseError.message,
          errorName: firebaseError.name || 'FirebaseError',
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
          user: parsedUser
        })

        // Return an early response if Firebase deletion fails
        return NextResponse.json(
          { message: 'Firebase deletion failed', error: firebaseError, sliceName: sliceVenue },
          { status: 500 }
        )
      }
    }

    // If Firebase deletion was successful, delete the venue from the database
    const deletedVenue = await prisma.venue.delete({
      where: { id }
    })

    await createLog('info', 'Venue deleted', {
      location: ['venue route - DELETE /api/venue/delete-venue'],
      message: `Venue "${deletedVenue.name}" deleted successfully`,
      name: 'VenueDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ id, sliceName: sliceVenue }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting venue failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ message: 'Error deleting venue', error, sliceName: sliceVenue }, { status: 500 })
  }
}
