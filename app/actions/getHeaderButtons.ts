import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export const getHeaderButtons = async () => {
  try {
    const buttons = await prisma.headerButton.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return buttons
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch header buttons'

    await createLog('error', 'Failed to fetch header buttons', {
      error: errorMessage
    })

    throw new Error(errorMessage)
  }
}
