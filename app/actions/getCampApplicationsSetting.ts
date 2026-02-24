'use server'

import prisma from '@/prisma/client'

export async function getCampApplicationsSetting() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'campApplicationsEnabled' }
  })

  return setting
}
