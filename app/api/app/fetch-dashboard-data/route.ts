import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceApp } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let user
  try {
    const userHeader = req.headers.get('x-user')!
    const parsedUser = JSON.parse(userHeader)

    // **OPTIMIZATION 1: Parallelize all database queries**
    const [
      userResult,
      testimonialsCount,
      usersCount,
      campApplicationsCount,
      questionsCount,
      concertsCount,
      venuesCount,
      teamMembersCount,
      photoGalleryImagesCount,
      sponsorCount,
      headerButtons,
      metric,
      dailyMetrics
    ] = await Promise.all([
      // User lookup
      prisma.user.findUnique({
        where: { id: parsedUser.id },
        select: { firstName: true, lastName: true, email: true, role: true, isAdmin: true, isSuperUser: true }
      }),

      // **OPTIMIZATION 2: Use count() instead of findMany().length**
      prisma.testimonial.count(),
      prisma.user.count(),
      prisma.campApplication.count(),
      prisma.question.count(),
      prisma.concert.count(),
      prisma.venue.count(),
      prisma.teamMember.count(),
      prisma.photoGalleryImage.count(),
      prisma.sponsor.count(),
      prisma.headerButton.findMany({ orderBy: { createdAt: 'desc' } }),

      // **OPTIMIZATION 3: Single metric query**
      prisma.appMetric.findUnique({
        where: { id: 'total-app-loads' },
        select: {
          desktopCount: true,
          mobileCount: true
        }
      }),

      // **OPTIMIZATION 4: Get last 7 days data in one query**
      prisma.dailyMetric.findMany({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
          }
        },
        select: {
          date: true,
          desktopCount: true,
          mobileCount: true
        },
        orderBy: { date: 'asc' }
      })
    ])

    user = userResult

    // **OPTIMIZATION 5: Simplified chart data preparation**
    const getLast7DaysData = () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const today = new Date()
      const last7Days = []

      // Generate last 7 days more efficiently
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
        const dayKey = date.toISOString().split('T')[0]
        last7Days.push({
          day: days[date.getDay()],
          date: dayKey,
          desktop: 0,
          mobile: 0
        })
      }

      // Map actual data to the 7 days
      const metricsMap = new Map(dailyMetrics.map((m) => [m.date.toISOString().split('T')[0], m]))

      return last7Days.map((day) => {
        const metric = metricsMap.get(day.date)
        return {
          ...day,
          desktop: metric?.desktopCount || 0,
          mobile: metric?.mobileCount || 0
        }
      })
    }

    // **OPTIMIZATION 6: Calculate totals from daily metrics instead of separate query**
    const dailyTotals = dailyMetrics.reduce(
      (acc, curr) => ({
        desktop: acc.desktop + curr.desktopCount,
        mobile: acc.mobile + curr.mobileCount
      }),
      { desktop: 0, mobile: 0 }
    )

    return NextResponse.json(
      {
        testimonialsCount,
        usersCount,
        user,
        campApplicationCount: campApplicationsCount,
        questionCount: questionsCount,
        metric: {
          desktopCount: (metric?.desktopCount || 0) + dailyTotals.desktop,
          mobileCount: (metric?.mobileCount || 0) + dailyTotals.mobile
        },
        sliceName: sliceApp,
        getLast7DaysData: getLast7DaysData(),
        concertsCount,
        teamMembersCount,
        questionsCount,
        photoGalleryImagesCount,
        sponsorCount,
        venuesCount,
        headerButtonCount: headerButtons.length,
        lastModifiedHeaderButton: headerButtons[0].updatedAt
      },
      { status: 200 }
    )
  } catch (error: any) {
    await createLog('error', `Fetching dashboard data failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading the dashboard.', error, sliceName: sliceApp },
      { status: 500 }
    )
  }
}
