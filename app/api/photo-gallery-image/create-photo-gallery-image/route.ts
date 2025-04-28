import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { slicePhotoGallery } from '@/public/data/api.data'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    await prisma.photoGalleryImage.create({ data: body })

    await createLog('info', 'Photo gallery image created', {
      location: ['photo gallery route - POST /api/photo-gallery-image/create-gallery-image'],
      message: `Photo gallery image successfully created`,
      name: 'PhotoGalleryImageCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: slicePhotoGallery }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating photo gallery image failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json({ message: 'Error uploading photo', error, sliceName: slicePhotoGallery }, { status: 500 })
  }
}
