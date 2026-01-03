import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getDashboardStats = unstable_cache(
  async () => {
    const [
      usersCount,
      campApplicationsCount,
      questionsCount,
      concertsCount,
      venuesCount,
      teamMembersCount,
      photoGalleryImagesCount,
      sponsorCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.campApplication.count(),
      prisma.question.count(),
      prisma.concert.count(),
      prisma.venue.count(),
      prisma.teamMember.count(),
      prisma.photoGalleryImage.count(),
      prisma.sponsor.count()
    ])

    return {
      stats: {
        usersCount,
        campApplicationCount: campApplicationsCount,
        questionCount: questionsCount,
        concertsCount,
        teamMembersCount,
        photoGalleryImagesCount,
        sponsorCount,
        venuesCount
      }
    }
  },
  ['getDashboardStats'],
  { tags: ['Dashboard'] }
)
