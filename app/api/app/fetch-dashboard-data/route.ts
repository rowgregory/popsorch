import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceApp } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let user
  try {
    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    const parsedUser = JSON.parse(userHeader)

    user = await prisma.user.findUnique({
      where: { id: parsedUser.id },
      select: { firstName: true, lastName: true, email: true, role: true, isAdmin: true, isSuperUser: true }
    })

    const concerts = await prisma.concert.findMany()
    const venues = await prisma.venue.findMany()
    const teamMembers = await prisma.teamMember.findMany()
    const photoGalleryImages = await prisma.photoGalleryImage.findMany({
      orderBy: [
        { createdAt: 'asc' },
        { id: 'asc' } // Secondary sort to break ties
      ]
    })
    const testimonials = await prisma.testimonial.findMany()
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    const campApplications = await prisma.campApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        student: true,
        address: true,
        parent: true
      }
    })

    const questions = await prisma.question.findMany({ orderBy: { createdAt: 'desc' } })

    const logs = await prisma.log.findMany({ orderBy: { createdAt: 'desc' } })

    const metricId = 'total-app-loads'
    const metric = await prisma.appMetric.findUnique({
      where: { id: metricId },
      select: {
        desktopCount: true,
        mobileCount: true
      }
    })

    return NextResponse.json(
      {
        concertsCount: concerts.length,
        venuesCount: venues.length,
        teamMembersCount: teamMembers.length,
        photoGalleryImagesCount: photoGalleryImages.length,
        testimonialsCount: testimonials.length,
        users,
        usersCount: users.length,
        user,
        campApplications,
        campApplicationCount: campApplications.length,
        questions,
        questionCount: questions.length,
        logs,
        logCount: logs.length,
        sliceName: sliceApp,
        metric
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
