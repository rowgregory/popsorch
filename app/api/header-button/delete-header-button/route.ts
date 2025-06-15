import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceHeaderButton } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    await prisma.headerButton.delete({
      where: { id: body.buttonId }
    })

    await createLog('info', 'Header button deleted success', {
      location: ['header button delete route - DELETE /api/header-button/delete-header-button'],
      message: `Header button successfully deleted`,
      name: 'HeaderButtonDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ id: body.buttonId, sliceName: sliceHeaderButton }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting header button failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json(
      { message: 'Error deleting header button', error, sliceName: sliceHeaderButton },
      { status: 500 }
    )
  }
}
