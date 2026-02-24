import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()
    const { id } = body

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    await prisma.question.delete({
      where: { id }
    })

    await createLog('info', 'Question deleted', {
      location: ['question route - DELETE /api/question/delete-question'],
      message: `Question successfully deleted`,
      name: 'QuestionDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ id }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting question failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error deleting question', error }, { status: 500 })
  }
}
