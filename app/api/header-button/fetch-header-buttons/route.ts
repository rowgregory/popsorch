import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceHeaderButton } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const headerButtons = await prisma.headerButton.findMany({
      orderBy: [
        { createdAt: 'asc' },
        { id: 'asc' } // Secondary sort to break ties
      ]
    })

    return NextResponse.json({ headerButtons, sliceName: sliceHeaderButton }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching header buttons failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading gallery images.', error, sliceName: sliceHeaderButton },
      { status: 500 }
    )
  }
}
