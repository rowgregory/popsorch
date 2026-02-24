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

    const { id, hasResponded } = body

    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { hasResponded }
    })

    await createLog('info', 'Question updated', {
      location: ['question route - PUT /api/question/update-question'],
      message: `Question successfully updated`,
      name: 'QuestionUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ question: updatedQuestion }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating question failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error updating question', error }, { status: 500 })
  }
}
