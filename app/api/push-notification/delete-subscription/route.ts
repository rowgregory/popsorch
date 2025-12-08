import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endpoint = searchParams.get('endpoint')

    if (!endpoint) {
      return NextResponse.json({ message: 'Endpoint is required' }, { status: 400 })
    }

    await prisma.pushSubscription.delete({
      where: { endpoint }
    })

    return NextResponse.json({ success: true, message: 'Subscription removed' })
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Failed to remove subscription',
        error: error.message
      },
      { status: 500 }
    )
  }
}
