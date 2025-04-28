import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceConcert } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const data = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const newConcert = await prisma.concert.create({
      data: {
        name: data.name,
        pressRelease: data.pressRelease,
        description: data.description,
        eventDetails: data.eventDetails,
        imageUrl: data.imageUrl,
        imageFilename: data.imageFilename,
        type: data.type,
        allSeriesExternalLink: data.allSeriesExternalLink
      }
    })

    await createLog('info', 'New concert created', {
      location: ['concert route - POST /api/camp/create-concert'],
      message: `Concert successfully created`,
      name: 'ConcertCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ concert: newConcert, sliceName: sliceConcert }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating concert failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error creating concert', error, sliceName: sliceConcert }, { status: 500 })
  }
}
