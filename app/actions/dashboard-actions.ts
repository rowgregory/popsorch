// app/actions/dashboard-actions.ts
'use server'

import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import { getUserId } from '../lib/auth'
import { createLog } from '../utils/logHelper'
import { parseStack } from 'next/dist/server/lib/parse-stack'

export async function getDashboardData() {
  try {
    const userId = await getUserId()

    if (!userId) {
      redirect('/auth/login')
    }

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
        method: 'GetDashboardData'
      })
    }

    const data = await response.json()

    const mailchimpMembers = data.members.map((member: any) => ({
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

    // Parallelize all database queries
    const [
      user,
      users,
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
      dailyMetrics,
      logs,
      sponsors,
      campApplications,
      questions
    ] = await Promise.all([
      // User lookup
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          role: true,
          isAdmin: true,
          isSuperUser: true,
          firstName: true
        }
      }),
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          isAdmin: true,
          isSoundEffectsOn: true,
          isSuperUser: true,
          lastName: true,
          role: true,
          updatedAt: true,
          createdAt: true
        }
      }),
      prisma.user.count(),
      prisma.campApplication.count(),
      prisma.question.count(),
      prisma.concert.count(),
      prisma.venue.count(),
      prisma.teamMember.count(),
      prisma.photoGalleryImage.count(),
      prisma.sponsor.count(),
      prisma.headerButton.findMany({
        orderBy: { createdAt: 'desc' },
        take: 1 // Only need the latest one
      }),

      // Metrics
      prisma.appMetric.findUnique({
        where: { id: 'total-app-loads' },
        select: {
          desktopCount: true,
          mobileCount: true
        }
      }),

      // Last 7 days data
      prisma.dailyMetric.findMany({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          date: true,
          desktopCount: true,
          mobileCount: true
        },
        orderBy: { date: 'asc' }
      }),
      prisma.log.findMany({
        orderBy: { createdAt: 'desc' },
        take: 200
      }),
      prisma.sponsor.findMany({
        orderBy: { createdAt: 'desc' }
      }),
      prisma.campApplication.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          address: true,
          parent: true,
          student: true
        }
      }),
      prisma.question.findMany({
        orderBy: { createdAt: 'desc' }
      })
    ])

    if (!user) {
      redirect('/auth/login')
    }

    // Check if user is admin
    if (!user.isAdmin && !user.isSuperUser) {
      redirect('/')
    }

    // Generate last 7 days data
    const getLast7DaysData = () => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const today = new Date()
      const last7Days = []

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

    // Calculate totals from daily metrics
    const dailyTotals = dailyMetrics.reduce(
      (acc, curr) => ({
        desktop: acc.desktop + curr.desktopCount,
        mobile: acc.mobile + curr.mobileCount
      }),
      { desktop: 0, mobile: 0 }
    )

    return {
      user,
      users,
      usersCount,
      campApplicationCount: campApplicationsCount,
      questionCount: questionsCount,
      metric: {
        desktopCount: (metric?.desktopCount || 0) + dailyTotals.desktop,
        mobileCount: (metric?.mobileCount || 0) + dailyTotals.mobile
      },
      getLast7DaysData: getLast7DaysData(),
      concertsCount,
      teamMembersCount,
      questionsCount,
      photoGalleryImagesCount,
      sponsorCount,
      venuesCount,
      headerButtonCount: headerButtons.length,
      lastModifiedHeaderButton: headerButtons[0]?.updatedAt || null,
      logs,
      mailchimpMembers,
      mailchimpMemberCount: data.total_items,
      sponsors,
      campApplications,
      questions
    }
  } catch (error) {
    throw error
  }
}
