'use server'

import prisma from '@/prisma/client'
import { redirect } from 'next/navigation'
import { getUserId } from '../lib/auth'

export async function getDashboardData() {
  try {
    const userId = await getUserId()

    if (!userId) {
      redirect('/auth/login')
    }

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
      prisma.log.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
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

    return {
      user,
      users,
      usersCount,
      campApplicationCount: campApplicationsCount,
      questionCount: questionsCount,
      concertsCount,
      teamMembersCount,
      questionsCount,
      photoGalleryImagesCount,
      sponsorCount,
      venuesCount,
      headerButtonCount: headerButtons.length,
      lastModifiedHeaderButton: headerButtons[0]?.updatedAt || null,
      logs,
      // mailchimpMembers,
      // mailchimpMemberCount: data.total_items,
      mailchimpMembers: [],
      mailchimpMemberCount: 0,
      sponsors,
      campApplications,
      questions
    }
  } catch (error) {
    throw error
  }
}
