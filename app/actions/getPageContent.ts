import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getPageContent = unstable_cache(
  async (slug: string) => {
    try {
      const page = await prisma.page.findUnique({
        where: { slug }
      })
      return page
    } catch (error) {
      return null
    }
  },
  ['getPageContent'],
  {
    tags: ['Page']
  }
)
