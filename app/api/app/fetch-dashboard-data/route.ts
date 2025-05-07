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

    const API_KEY = process.env.MAILCHIMP_API_KEY!
    const LIST_ID = process.env.MAILCHIMP_LIST_ID!
    const DATACENTER = API_KEY.split('-')[1]

    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members?count=50&offset=0&sort_field=timestamp_opt&sort_dir=DESC`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      await createLog('error', `Mailchimp API request failed: ${errorResponse.title}`, {
        errorLocation: parseStack(JSON.stringify(errorResponse)),
        errorMessage: errorResponse.detail,
        errorName: errorResponse.title,
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json(
        { message: `Mailchimp API Error: ${response.statusText}`, sliceName: sliceApp },
        { status: response.status }
      )
    }

    const data = await response.json()

    const members = data.members.map((member: any) => ({
      email: member.email_address,
      status: member.status,
      name: member.full_name,
      phoneNumber: member.merge_fields.MMERGE3,
      address: member.merge_fields.MMERGE4,
      interests: {
        isOption1: member.interests['05e5e5fd1e'],
        isOption2: member.interests['23e4855071'],
        isOption3: member.interests['f02e8752c1'],
        isOption4: member.interests['4d63e535d9'],
        isNewPatron: member.interests['21dd6933b9'],
        agreedToPrivacyStatement: member.interests['2b3f9c51d8']
      },
      stats: {
        avgOpenRate: member.stats.avg_open_rate,
        avgClickRate: member.stats.avg_click_rate
      },
      createdAt: member.timestamp_opt,
      contactId: member.contact_id,
      ipOpt: member.ip_opt
    }))

    return NextResponse.json(
      {
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
        metric,
        sliceName: sliceApp,
        members,
        mailchimpMembersCount: data.total_items
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
