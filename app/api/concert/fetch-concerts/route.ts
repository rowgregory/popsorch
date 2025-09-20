import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceConcert } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const concerts = await prisma.concert.findMany({ orderBy: { createdAt: 'desc' } })

    return NextResponse.json({ concerts, sliceName: sliceConcert }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching concerts failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading concerts.', error, sliceName: sliceConcert },
      { status: 500 }
    )
  }
}
