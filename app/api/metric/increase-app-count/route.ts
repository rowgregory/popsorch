import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {
  try {
    // Determine if it's mobile or desktop (you can use User-Agent string)
    const userAgent = req.headers.get('user-agent') || ''
    const isMobile = /mobile/i.test(userAgent)

    // Choose the metric ID
    const metricId = 'total-app-loads'

    const result = await prisma.appMetric.upsert({
      where: { id: metricId },
      update: isMobile ? { mobileCount: { increment: 1 } } : { desktopCount: { increment: 1 } },
      create: {
        id: metricId,
        desktopCount: isMobile ? 0 : 1,
        mobileCount: isMobile ? 1 : 0
      }
    })

    return NextResponse.json({ message: 'App load counted', count: result }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Error logging app load', error }, { status: 500 })
  }
}
