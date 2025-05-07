import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

export async function GET(req: NextRequest) {
  try {
    const campApplications = await prisma.campApplication.findMany({
      include: {
        student: true,
        parent: true,
        address: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ campApplications }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Failed to fetch camp applications: ${error.message}`, {
      location: ['camp-application route - GET /api/camp/fetch-camp-applications'],
      message: 'Error fetching camp applications',
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ message: 'Failed to fetch camp applications' }, { status: 500 })
  }
}
