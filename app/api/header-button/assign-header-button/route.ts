import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

export async function PUT(req: NextRequest) {
  let parsedUser
  const body = await req.json()

  try {
    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    // Validate required fields
    if (!body.buttonId) {
      return NextResponse.json({ message: 'Button Id missing' }, { status: 400 })
    }

    const result = await prisma.$transaction([
      // Set all buttons to inactive
      prisma.headerButton.updateMany({
        data: { isActive: false }
      }),
      // Set the selected button as active
      prisma.headerButton.update({
        where: { id: body.buttonId },
        data: { isActive: true }
      })
    ])

    const updatedButton = result[1]

    await createLog('info', 'Header button  assigned', {
      location: ['header button assigned route - PUT /api/header-button/assign-header-button'],
      message: `Header button successfully assigned`,
      name: 'HeaderButtonAssigned',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ headerButton: updatedButton }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Assigning header button failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Failed to assign header button', error }, { status: 500 })
  }
}
