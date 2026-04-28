import prisma from '@/prisma/client'
import { createLog } from '../../../utils/logHelper'

export const getPage = async (slug: string) => {
  if (!slug) return null

  const page = await prisma.page
    .findUnique({
      where: { slug }
    })
    .catch((error) => {
      createLog('error', `Failed to fetch page: ${slug}`, {
        error: error instanceof Error ? error.message : String(error),
        slug
      }).catch(() => null)
      return null
    })

  return page
}
