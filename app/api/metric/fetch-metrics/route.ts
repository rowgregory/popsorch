import { NextResponse } from 'next/server'
import prisma from '@/prisma/client'

export async function GET() {
  try {
    const metricId = 'total-app-loads'

    const metric = await prisma.appMetric.findUnique({
      where: { id: metricId },
      select: {
        desktopCount: true,
        mobileCount: true
      }
    })

    if (!metric) {
      return NextResponse.json({ message: 'Metric not found' }, { status: 404 })
    }

    return NextResponse.json({ metric }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: 'Error fetching app load data', error }, { status: 500 })
  }
}
