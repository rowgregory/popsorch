import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    // Find the existing record or create one if it doesn't exist
    let banner = await prisma.seasonPackageBanner.findFirst()

    if (!banner) {
      // Create the first record with isVisible = true
      banner = await prisma.seasonPackageBanner.create({
        data: {
          isVisible: true
        }
      })
    } else {
      // Toggle the existing isVisible value
      banner = await prisma.seasonPackageBanner.update({
        where: { id: banner.id },
        data: {
          isVisible: !banner.isVisible
        }
      })
    }

    await createLog('info', 'Toggled season package banner visible', {
      location: ['app route - POST /api/app/toggle-season-pcakage-banner-visible'],
      message: `Season package banner successfully toggled visible`,
      name: 'SeasonPackageBannerToggledVisible',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({
      success: true,
      isSeasonPackageBannerToggledVisible: banner.isVisible,
      message: `Season Package Banner is now ${banner.isVisible ? 'VISIBLE' : 'HIDDEN'}`
    })
  } catch (error: any) {
    await createLog('error', `Toggling season package banner visible failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to toggle season package banner visible'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
