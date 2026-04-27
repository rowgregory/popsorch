'use server'

import prisma from '@/prisma/client'

export async function createCampApplicationsSetting() {
  const setting = await prisma.siteSetting
    .upsert({
      where: { key: 'campApplicationsEnabled' },
      update: {},
      create: {
        key: 'campApplicationsEnabled',
        name: 'Camp Applications',
        value: false
      }
    })
    .catch(() => null)

  if (!setting) return { success: false, error: 'Failed to create setting' }

  return { success: true, data: setting }
}
