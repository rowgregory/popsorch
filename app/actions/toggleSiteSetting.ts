'use server'

import prisma from '@/prisma/client'

export async function toggleSiteSetting(key: string, value: boolean) {
  return prisma.siteSetting.update({
    where: { key },
    data: { value }
  })
}
