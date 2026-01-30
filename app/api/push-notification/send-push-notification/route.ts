import webPush from 'web-push'
import { NextRequest, NextResponse } from 'next/server'
import { slicePushNotification } from '@/public/data/api.data'
import prisma from '@/prisma/client'

// Ensure you have your VAPID keys stored in environment variables
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const vapidPrivateKey = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY

if (!vapidPublicKey || !vapidPrivateKey) {
  throw new Error('VAPID keys are missing from environment variables')
}

// Set up VAPID details for the push notification service
webPush.setVapidDetails(
  'mailto:sqysh@sqysh.io', // This is your email address for VAPID identity
  vapidPublicKey, // Public VAPID key
  vapidPrivateKey // Private VAPID key
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, title } = body

    const subscriptions = await prisma.pushSubscription.findMany()

    if (subscriptions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No subscriptions found',
          sliceName: slicePushNotification
        },
        { status: 404 }
      )
    }

    // Send notifications to all subscriptions
    const notificationPromises = subscriptions.map(async (sub) => {
      const subscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      }

      try {
        await webPush.sendNotification(
          subscription,
          JSON.stringify({
            title: title || 'Notification',
            body: message,
            icon: '/images/icon-192x192.png', // Optional: add your app icon
            badge: '/images/badge-72x72.png', // Optional: add badge icon
            data: {
              url: '/admin/camp-applications', // Optional: URL to open when clicked
              timestamp: Date.now()
            }
          })
        )
        return { success: true, endpoint: sub.endpoint }
      } catch (error: any) {
        // If subscription is invalid (410 status), remove it from database
        if (error.statusCode === 410) {
          await prisma.pushSubscription.delete({
            where: { endpoint: sub.endpoint }
          })
        }

        return { success: false, endpoint: sub.endpoint, error: error.message }
      }
    })

    const results = await Promise.allSettled(notificationPromises)
    const successful = results.filter((result) => result.status === 'fulfilled' && result.value.success).length

    return NextResponse.json(
      {
        success: true,
        message: `Notifications sent successfully to ${successful}/${subscriptions.length} subscribers`,
        results: results.map((result) =>
          result.status === 'fulfilled' ? result.value : { success: false, error: result.reason }
        ),
        sliceName: slicePushNotification
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: 'Failed to send notification',
        error: error instanceof Error ? error.message : 'Unknown error',
        sliceName: slicePushNotification
      },
      { status: 500 }
    )
  }
}
