import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceApp } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // **OPTIMIZATION: Parallelize all database queries**
    const [
      textBlocks,
      concerts,
      venues,
      photoGalleryImages,
      teamMembers,
      seasonPackageBanner,
      headerButton,
      featureToggleCard
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
      })
    ])

    const sortedConcerts = concerts.sort((a: any, b: any) => {
      const aDate: any = new Date(a.eventDetails[0]?.date)
      const bDate: any = new Date(b.eventDetails[0]?.date)
      return aDate - bDate
    })

    const transformedTextBlocks = textBlocks.reduce((acc: any, item: any) => {
      // Initialize the type group if it doesn't exist
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

    return NextResponse.json(
      {
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
        teamMembersCount: teamMembers?.length,
        isSeasonPackageBannerToggledVisible: seasonPackageBanner?.isVisible ?? true,
        isSeasonPackageBannerToggledLive: seasonPackageBanner?.isLive ?? true,
        sliceName: sliceApp,
        headerButton,
        isFeatureToggleCardVisible: featureToggleCard?.isVisible ?? true,
        isFeatureToggleCardLive: featureToggleCard?.isLive ?? true
      },
      { status: 200 }
    )
  } catch (error: any) {
    await createLog('error', `Fetching app data failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json({ message: 'Error fetching app data', error, sliceName: sliceApp })
  }
}
