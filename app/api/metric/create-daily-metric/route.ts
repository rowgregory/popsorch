import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { isMobile, date } = body

    // Use provided date or default to today
    const targetDate = date ? new Date(date) : new Date()
    const dateString = targetDate.toISOString().split('T')[0] // YYYY-MM-DD format

    const result = await prisma.dailyMetric.upsert({
      where: {
        date: new Date(dateString)
      },
      update: isMobile ? { mobileCount: { increment: 1 } } : { desktopCount: { increment: 1 } },
      create: {
        date: new Date(dateString),
        desktopCount: isMobile ? 0 : 1,
        mobileCount: isMobile ? 1 : 0
      }
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: `${isMobile ? 'Mobile' : 'Desktop'} count incremented for ${dateString}`
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update daily metric'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
