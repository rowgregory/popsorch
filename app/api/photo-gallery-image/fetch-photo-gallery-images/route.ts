import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceApp } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const photoGalleryImages = await prisma.photoGalleryImage.findMany({
      orderBy: [
        { createdAt: 'asc' },
        { id: 'asc' } // Secondary sort to break ties
      ]
    })

    return NextResponse.json({ photoGalleryImages, sliceName: sliceApp }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching photo gallery images failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading gallery images.', error, sliceName: sliceApp },
      { status: 500 }
    )
  }
}
