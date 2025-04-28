import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceConcert } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json()

    const { id, ...updatedFields } = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined) // We no longer need to use the key
    )

    if (!id) {
      await createLog('error', 'Concert id missing', {
        location: ['concert route - PATCH /api/camp/update-concert'],
        message: `Concert id missing`,
        name: 'ConcertIdMissing',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })
      return NextResponse.json({ message: 'Missing concert ID', sliceName: sliceConcert }, { status: 400 })
    }

    const existingConcert = await prisma.concert.findUnique({
      where: { id: id as string }
    })

    if (!existingConcert) {
      await createLog('error', 'Concert not found', {
        location: ['concert route - PATCH /api/camp/update-concert'],
        message: `Concert not found`,
        name: 'ConcertNotFound',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })
      return NextResponse.json({ message: 'Concert not found', sliceName: sliceConcert }, { status: 404 })
    }

    await prisma.concert.update({
      where: { id: id as string },
      data: updatedFields
    })

    await createLog('info', 'Concert updated', {
      location: ['concert route - PATCH /api/camp/update-concert'],
      message: `Concert successfully updated`,
      name: 'ConcertUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ sliceName: sliceConcert }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating concert failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json({ message: 'Error updating concert', error, sliceName: sliceConcert }, { status: 500 })
  }
}
