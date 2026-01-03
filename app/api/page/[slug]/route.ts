import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params

    const page = await prisma.page.findUnique({
      where: { slug }
    })

    return NextResponse.json({ success: true, page })
  } catch (error) {
    await createLog('error', 'Failed to fetch page', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch page'
      },
      { status: 500 }
    )
  }
}

// PATCH /api/page/[slug] - Update page
export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // const session = await auth()

    // if (!session?.user?.id) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    // }

    const { slug } = await params
    const { content } = await request.json()

    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'Content must be a valid object'
        },
        { status: 400 }
      )
    }

    const page = await prisma.page.update({
      where: { slug },
      data: { content }
    })

    await createLog('info', 'Page updated', {
      //   userId: session.user.id,
      //   userName: session.user.name,
      slug: slug
    })

    return NextResponse.json({ success: true, ...page })
  } catch (error) {
    await createLog('error', 'Failed to update page', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update page'
      },
      { status: 500 }
    )
  }
}
