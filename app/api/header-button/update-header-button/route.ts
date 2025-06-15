import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

const prisma = new PrismaClient()

interface UpdateHeaderButtonBody {
  id: string
  text: string
  backgroundColor: string
  fontColor: string
  animation: string
  link: string
  linkType: 'external' | 'internal' | 'phone'
}

export async function PUT(req: NextRequest) {
  let parsedUser
  try {
    const body: UpdateHeaderButtonBody = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    if (!body.text || !body.link || !body.id) {
      return NextResponse.json(
        {
          error: 'All fields are required: text, link, id'
        },
        { status: 400 }
      )
    }

    // Check if button exists
    const existingButton = await prisma.headerButton.findUnique({
      where: { id: body.id }
    })

    if (!existingButton) {
      return NextResponse.json(
        {
          error: 'Button not found'
        },
        { status: 404 }
      )
    }

    // Build update data object with only provided fields
    const updateData: any = {
      text: body.text,
      link: body.link
    }

    // Add optional fields if they have actual values (not empty string or null)
    if (body.backgroundColor && body.backgroundColor.trim() !== '') {
      updateData.backgroundColor = body.backgroundColor
    }
    if (body.fontColor && body.fontColor.trim() !== '') {
      updateData.fontColor = body.fontColor
    }
    if (body.animation && body.animation.trim() !== '') {
      updateData.animation = body.animation
    }
    if (body.linkType && body.linkType.trim() !== '') {
      updateData.linkType = body.linkType
    }

    // Update the button
    const updatedButton = await prisma.headerButton.update({
      where: { id: body.id },
      data: updateData
    })

    await createLog('info', 'Header button updated', {
      location: ['header button updated route - POST /api/header-button/update-header-button'],
      message: `Header button successfully updated`,
      name: 'HeaderButtonUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json(
      {
        success: true,
        headerButton: updatedButton
      },
      { status: 200 }
    )
  } catch (error: any) {
    await createLog('error', `Update header buttons failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        message: 'Failed to updated header button'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
