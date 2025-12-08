import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { slicePhotoGallery } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const updatedPhotoGalleryImage = await prisma.photoGalleryImage.update({
      where: { id: body.id },
      data: { isHomeHero: body.isHomeHero }
    })

    return NextResponse.json(
      { photoGalleryImage: updatedPhotoGalleryImage, sliceName: slicePhotoGallery },
      { status: 200 }
    )
  } catch (error: any) {
    await createLog('error', `Updating photo gallery image failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading gallery images.', error, sliceName: slicePhotoGallery },
      { status: 500 }
    )
  }
}
