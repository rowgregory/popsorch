'use server'

import prisma from '@/prisma/client'
import { unstable_cache } from 'next/cache'

export const getLayoutData = unstable_cache(
  async () => {
    const [campApplicationsSetting, footer] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: 'campApplicationsEnabled' } }).catch(() => null),
      prisma.page.findUnique({ where: { slug: 'footer' } }).catch(() => null)
    ])
    return { campApplicationsSetting, footerData: footer }
  },
  ['layout-data'],
  { revalidate: 3600, tags: ['layout-data'] }
)
