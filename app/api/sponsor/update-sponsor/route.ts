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

    const { id, externalLink, filePath, filename, name, amount, level } = body

    const updatedSonsor = await prisma.sponsor.update({
      where: { id },
      data: { externalLink, filePath, filename, name, amount, level }
    })

    await createLog('info', 'Question updated', {
      location: ['sponsor route - PUT /api/sponsor/update-sponsor'],
      message: `Question successfully updated`,
      name: 'QuestionUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sponsor: updatedSonsor }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating sponsor failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error updating sponsor', error }, { status: 500 })
  }
}
