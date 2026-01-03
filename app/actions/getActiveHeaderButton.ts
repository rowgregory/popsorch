import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'
import { createLog } from '../utils/logHelper'

export const getActiveHeaderButton = unstable_cache(
  async () => {
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
  },
  ['getActiveHeaderButton'],
  { tags: ['Header-Button'] }
)
