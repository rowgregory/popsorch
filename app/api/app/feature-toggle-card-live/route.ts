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
    let banner = await prisma.featureToggleCard.findFirst()

    if (!banner) {
      // Create the first record with isLive = true
      banner = await prisma.featureToggleCard.create({
        data: {
          isLive: true
        }
      })
    } else {
      // Toggle the existing isLive value
      banner = await prisma.featureToggleCard.update({
        where: { id: banner.id },
        data: {
          isLive: !banner.isLive
        }
      })
    }

    await createLog('info', 'Toggled feature toggle card live', {
      location: ['app route - POST /api/app/toggle-season-package-banner-live'],
      message: `Season package banner successfully toggled live`,
      name: 'SeasonPackageBannerToggledLive',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({
      success: true,
      isSeasonPackageBannerToggledLive: banner.isLive,
      message: `Season Package Banner is now ${banner.isLive ? 'LIVE' : 'PRIVATE'}`
    })
  } catch (error: any) {
    await createLog('error', `Toggling feature toggle card live failed: ${error.message}`, {
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
        error: 'Failed to toggle feature toggle card live'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
