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

    const deletedSponsor = await prisma.sponsor.delete({
      where: { id }
    })

    await createLog('info', 'Sponsor deleted', {
      location: ['sponsor route - DELETE /api/sponsor/delete-sponsor'],
      message: `Sponsor successfully deleted`,
      name: 'SponsorDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ id: deletedSponsor.id }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting sponsor failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error deleting sponsor', error }, { status: 500 })
  }
}
