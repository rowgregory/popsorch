import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')!
    parsedUser = JSON.parse(userHeader)

    // Validate required fields
    if (!body.text || typeof body.text !== 'string') {
      return NextResponse.json({ message: 'Button text is required and must be a string' }, { status: 400 })
    }

    // Validate linkType
    const validLinkTypes = ['internal', 'external', 'phone']
    if (body.linkType && !validLinkTypes.includes(body.linkType)) {
      return NextResponse.json({ message: `linkType must be one of: ${validLinkTypes.join(', ')}` }, { status: 400 })
    }

    // Validate animation
    const validAnimations = ['scale', 'slide', 'bounce', 'glow', 'rotate']
    if (body.animation && !validAnimations.includes(body.animation)) {
      return NextResponse.json({ message: `animation must be one of: ${validAnimations.join(', ')}` }, { status: 400 })
    }

    const createdHeaderButton = await prisma.headerButton.create({
      data: {
        animation: body.animation || 'scale',
        backgroundColor: body.backgroundColor || 'da0032',
        fontColor: body.fontColor || 'ffffff',
        text: body.text,
        linkType: body.linkType || 'internal',
        link: body.link || ''
      }
    })

    await createLog('info', 'Header button created', {
      location: ['header button route - POST /api/header-button/create-header-button'],
      message: `Header button successfully created`,
      name: 'HeaderButtonCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ headerButton: createdHeaderButton }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating header button failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error creating header button', error }, { status: 500 })
  }
}
