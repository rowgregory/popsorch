import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, endpoint, keys, userAgent } = body

    // Save or update the subscription in the database
    const subscription = await prisma.pushSubscription.upsert({
      where: { endpoint },
      update: {
        userId,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent,
        updatedAt: new Date()
      },
      create: {
        userId,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        userAgent
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Subscription saved successfully',
      subscriptionId: subscription.id
    })
  } catch (error: any) {
    console.error('Error saving push subscription:', error)
    return NextResponse.json(
      {
        message: 'Failed to save subscription',
        error: error.message
      },
      { status: 500 }
    )
  }
}
