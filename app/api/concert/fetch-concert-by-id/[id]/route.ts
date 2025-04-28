import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceConcert } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: any) {
  try {
    const parameters = await params
    const id = parameters.id

    const concert = await prisma.concert.findUnique({ where: { id } })

    return NextResponse.json({ concert, sliceName: sliceConcert }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching concert by id failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ message: 'Error fetching concert by id', error, sliceName: sliceConcert })
  }
}
