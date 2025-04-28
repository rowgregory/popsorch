import webPush from 'web-push'
import { NextRequest, NextResponse } from 'next/server'

const sliceName = 'pushNotificationApi'

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
    const { endpoint, keys, message } = body

    const subscription = {
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth
      }
    }

    // Send the push notification using the Web Push library
    await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: message,
        body: message // The message you want to send in the notification
      })
    )

    return NextResponse.json({ success: true, message: 'Notification sent successfully', sliceName }, { status: 200 })
  } catch (error: unknown) {
    return NextResponse.json({ message: 'Failed to send notification', error, sliceName }, { status: 500 })
  }
}
