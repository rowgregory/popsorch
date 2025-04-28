import deleteFileFromFirebase from '@/app/utils/deleteFileFromFirebase'
import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceVenue } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()
    const {
      id,
      name,
      capacity,
      accessibility,
      immersiveEnvironment,
      parking,
      imageUrl,
      imageFilename,
      imageToDeleteFilename,
      address
    } = body

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    if (imageToDeleteFilename) {
      try {
        await deleteFileFromFirebase(imageToDeleteFilename, 'image')
      } catch (firebaseError: any) {
        // Log the Firebase deletion error and return early
        await createLog('error', `Failed to delete venue image from Firebase: ${firebaseError.message}`, {
          errorLocation: parseStack(JSON.stringify(firebaseError)),
          errorMessage: firebaseError.message,
          errorName: firebaseError.name || 'FirebaseError',
          timestamp: new Date().toISOString(),
          url: req.url,
          method: req.method,
          user: parsedUser
        })

        return NextResponse.json(
          { message: 'Firebase deletion failed', error: firebaseError, sliceName: sliceVenue },
          { status: 500 }
        )
      }
    }

    await prisma.venue.update({
      where: { id },
      data: {
        name,
        capacity,
        accessibility,
        immersiveEnvironment,
        parking,
        imageUrl,
        imageFilename,
        address
      }
    })

    await createLog('info', 'Venue updated', {
      location: ['venue route - PUT /api/venue/update-venue'],
      message: `Venue "${name}" updated successfully`,
      name: 'VenueUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceVenue }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating venue failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ message: 'Error updating venue', error, sliceName: sliceVenue }, { status: 500 })
  }
}
