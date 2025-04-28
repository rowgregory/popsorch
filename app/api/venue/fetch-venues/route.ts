import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceVenue } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const venues = await prisma.venue.findMany()

    return NextResponse.json({ venues, sliceName: sliceVenue }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching venues failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading venues.', error, sliceName: sliceVenue },
      { status: 500 }
    )
  }
}
