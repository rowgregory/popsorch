import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { slicePhotoGallery } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const teamMembers = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } })

    return NextResponse.json({ teamMembers, sliceName: slicePhotoGallery }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching team members failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading team members.', error, sliceName: slicePhotoGallery },
      { status: 500 }
    )
  }
}
