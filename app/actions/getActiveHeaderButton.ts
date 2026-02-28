import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export const getActiveHeaderButton = async () => {
  try {
    const button = await prisma.headerButton.findFirst({
      where: { isActive: true }
    })

    return button
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch active header button'

    await createLog('error', 'Failed to fetch active header button', {
      error: errorMessage
    })

    throw new Error(errorMessage)
  }
}
