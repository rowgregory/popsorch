import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getCampApplications = unstable_cache(
  async () => {
    try {
      const campApplications = await prisma.campApplication.findMany({
        include: {
          address: true,
          student: true,
          parent: true
        }
      })

      return {
        campApplications,
        count: campApplications.length,
        noCampApplications: campApplications.length === 0
      }
    } catch {
      return {
        campApplications: [],
        count: 0,
        noCampApplications: 0
      }
    }
  },
  ['getCampApplications'],
  {
    tags: ['Camp']
  }
)
