import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceTeamMember } from '@/public/data/api.data'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const createdTeamMember = await prisma.teamMember.create({ data: body })

    await createLog('info', 'Team member created', {
      location: ['team member route - POST /api/team-member/create-team-member'],
      message: `Team member successfully created`,
      name: 'TeamMemberCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ teamMember: createdTeamMember, sliceName: sliceTeamMember }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating team member failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json(
      { message: 'Error creating team member', error, sliceName: sliceTeamMember },
      { status: 500 }
    )
  }
}
