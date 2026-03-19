import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export const getActiveHeaderButton = async () => {
  try {
    const button = await prisma.headerButton.findFirst({
      where: { isActive: true }
    })
    return button
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Don't log connection errors — these are infrastructure noise not bugs
    const isConnectionError =
      errorMessage.includes('Server has closed the connection') ||
      errorMessage.includes('Connection refused') ||
      errorMessage.includes("Can't reach database server") ||
      errorMessage.includes('Connection timed out')

    if (!isConnectionError) {
      await createLog('error', 'Failed to fetch active header button', {
        error: errorMessage
      })
    }

    return null // never throw — header button is non-critical
  }
}
