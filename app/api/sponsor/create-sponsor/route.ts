import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceSponsor } from '@/public/data/api.data'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const createdSponsor = await prisma.sponsor.create({ data: body })

    await createLog('info', 'Sponsor created', {
      location: ['sponsor route - POST /api/sponsor/create-sponsor'],
      message: `Sponsor successfully created`,
      name: 'SponsorCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sponsor: createdSponsor, sliceName: sliceSponsor }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating sponsor failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error creating sponsor', error, sliceName: sliceSponsor }, { status: 500 })
  }
}
