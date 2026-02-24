import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const { id, ...data } = body

    const updatedMember = await prisma.teamMember.update({
      where: { id },
      data
    })

    await createLog('info', 'Team member updated', {
      location: ['team member route - PUT /api/team-member/update-team-member'],
      message: `Team member successfully updated`,
      name: 'TeamMemberUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ teamMember: updatedMember }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating team member failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error updating team member', error }, { status: 500 })
  }
}
