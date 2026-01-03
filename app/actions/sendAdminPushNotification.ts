'use server'

import { createLog } from '../utils/logHelper'

export async function sendAdminPushNotification(title: string, message: string) {
  try {
    const response = await fetch('/api/push-notification/send-push-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        message
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send notification')
    }

    const data = await response.json()

    await createLog('info', 'Admin push notification sent successfully', {
      message: data.message
    })

    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete team member'

    await createLog('error', 'Failed to delete team member', {
      error: errorMessage,
      inputData: {
        title,
        message
      }
    })

    throw new Error(errorMessage)
  }
}
