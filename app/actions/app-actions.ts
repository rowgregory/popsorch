import prisma from '@/prisma/client'
import { getUserId } from '../lib/auth'

export async function getAppData() {
  try {
    const userId = await getUserId()
    const [
      textBlocks,
      concerts,
      venues,
      photoGalleryImages,
      teamMembers,
      seasonPackageBanner,
      headerButton,
      featureToggleCard,
      user
    ] = await Promise.all([
      prisma.textBlock.findMany(),
      prisma.concert.findMany(),
      prisma.venue.findMany(),
      prisma.photoGalleryImage.findMany({
        orderBy: [{ createdAt: 'asc' }]
      }),
      prisma.teamMember.findMany(),
      prisma.seasonPackageBanner.findFirst({
        select: {
          isVisible: true,
          isLive: true
        }
      }),
      prisma.headerButton.findFirst({ where: { isActive: true } }),
      prisma.featureToggleCard.findFirst({
        select: {
          isVisible: true,
          isLive: true
        }
      }),
      // Fetch user if logged in
      userId
        ? prisma.user.findUnique({
            where: { id: userId },
            select: {
              id: true,
              email: true,
              isAdmin: true,
              isSuperUser: true,
              role: true,
              createdAt: true,
              firstName: true,
              isBackgroundMusicOn: true,
              isSoundEffectsOn: true,
              isSupporter: true,
              lastName: true,
              updatedAt: true
            }
          })
        : null
    ])

    const sortedConcerts = concerts.sort((a: any, b: any) => {
      const aDate = new Date(a.eventDetails[0]?.date)
      const bDate = new Date(b.eventDetails[0]?.date)
      return aDate.getTime() - bDate.getTime()
    })

    const transformedTextBlocks = textBlocks.reduce((acc: any, item: any) => {
      if (!acc[item.type]) {
        acc[item.type] = {}
      }

      if (item.key.toLowerCase().includes('file')) {
        acc[item.type][item.key] = {
          value: item.value,
          mimeType: item.mimeType || null,
          fileName: item.fileName || null
        }
      } else {
        acc[item.type][item.key] = item.value
      }

      return acc
    }, {})

    const staff = teamMembers.filter((user) => user.role === 'Staff')
    const sortedStaff = [...staff].sort((a, b) => a.displayOrder - b.displayOrder)

    const boardMembers = teamMembers.filter((user) => user.role === 'Board-Member')
    const sortedBoardMembers = [...boardMembers].sort((a, b) => a.displayOrder - b.displayOrder)

    const musicians = teamMembers.filter((user) => user.role === 'Musician')
    const sortedMusicians = [...musicians].sort((a, b) => {
      if (a.displayOrder === 0 && b.displayOrder !== 0) return 1
      if (b.displayOrder === 0 && a.displayOrder !== 0) return -1
      return a.displayOrder - b.displayOrder
    })

    return {
      textBlocks: transformedTextBlocks,
      concerts: sortedConcerts,
      concertsCount: sortedConcerts?.length,
      venues,
      venuesCount: venues?.length,
      photoGalleryImages,
      photoGalleryImagesCount: photoGalleryImages?.length,
      teamMembers,
      staff: sortedStaff,
      boardMembers: sortedBoardMembers,
      musicians: sortedMusicians,
      teamMembersCount: teamMembers?.length,
      isSeasonPackageBannerToggledVisible: seasonPackageBanner?.isVisible ?? true,
      isSeasonPackageBannerToggledLive: seasonPackageBanner?.isLive ?? true,
      headerButton,
      isFeatureToggleCardVisible: featureToggleCard?.isVisible ?? true,
      isFeatureToggleCardLive: featureToggleCard?.isLive ?? true,
      user,
      isAuthenticated: !!user
    }
  } catch (error) {
    throw error
  }
}
