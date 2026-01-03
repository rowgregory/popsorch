import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'
import { createLog } from '../utils/logHelper'

export const getPage = unstable_cache(
  async (slug: string) => {
    try {
      if (!slug) {
        throw new Error('Page slug is required')
      }

      const page = await prisma.page.findUnique({
        where: { slug }
      })

      //   if (!page) {
      //     await createLog('info', 'Page not found', { slug })
      //     return null
      //   }

      return page
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page'

      await createLog('error', 'Failed to fetch page', {
        error: errorMessage,
        slug
      })

      throw new Error(errorMessage)
    }
  },
  ['getPage'],
  { tags: ['Page'] }
)
