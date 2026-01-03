import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let parsedUser: any
  try {
    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const body = await req.json()
    const { slug, content } = body

    if (!slug || !content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: slug, content'
        },
        { status: 400 }
      )
    }

    const page = await prisma.page.create({
      data: {
        slug,
        content,
        createdBy: 'testuser'
        // createdBy: session.user.id
      }
    })

    // await createLog('info', 'Page created', {
    //   userId: session.user.id,
    //   userName: session.user.name,
    //   slug: slug
    // })

    return NextResponse.json({ success: true, ...page }, { status: 201 })
  } catch (error) {
    await createLog('error', 'Failed to create page', {
      error: error instanceof Error ? error.message : 'Unknown error',
      user: parsedUser
    })

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create page'
      },
      { status: 500 }
    )
  }
}
