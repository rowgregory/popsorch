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
    let featureToggleCard = await prisma.featureToggleCard.findFirst()

    if (!featureToggleCard) {
      // Create the first record with isVisible = true
      featureToggleCard = await prisma.featureToggleCard.create({
        data: {
          isVisible: true
        }
      })
    } else {
      // Toggle the existing isVisible value
      featureToggleCard = await prisma.featureToggleCard.update({
        where: { id: featureToggleCard.id },
        data: {
          isVisible: !featureToggleCard.isVisible
        }
      })
    }

    await createLog('info', 'Toggled feature card visible', {
      location: ['app route - POST /api/app/toggle-season-pcakage-banner-visible'],
      message: `Feature toggle card successfully toggled visible`,
      name: 'FeatureToggleCardToggledVisible',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({
      success: true,
      isFeatureToggleCardToggledVisible: featureToggleCard.isVisible,
      message: `Feature is now ${featureToggleCard.isVisible ? 'VISIBLE' : 'HIDDEN'}`
    })
  } catch (error: any) {
    await createLog('error', `Toggling feature card visible failed: ${error.message}`, {
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
        error: 'Failed to toggle feature card visible'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
