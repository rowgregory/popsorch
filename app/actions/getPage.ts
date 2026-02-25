import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export const getPage = async (slug: string) => {
  try {
    if (!slug) {
      throw new Error('Page slug is required')
    }

    const page = await prisma.page.findUnique({
      where: { slug }
    })

    return page
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch page'

    await createLog('error', 'Failed to fetch page', {
      error: errorMessage,
      slug
    })

    throw new Error(errorMessage)
  }
}
