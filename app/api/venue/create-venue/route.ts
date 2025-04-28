import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceVenue } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()
    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    const { name, capacity, accessibility, immersiveEnvironment, parking, imageUrl, imageFilename, address } = body

    const newVenue = await prisma.venue.create({
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

    await createLog('info', 'Venue created', {
      location: ['venue route - POST /api/venue/create-venue'],
      message: `Venue "${newVenue.name}" created successfully`,
      name: 'VenueCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ venue: newVenue, sliceName: sliceVenue }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating venue failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ message: 'Error creating venue', error, sliceName: sliceVenue }, { status: 500 })
  }
}
