'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export async function getCampApplicationById(id: string) {
  try {
    return await prisma.campApplication.findFirst({
      where: {
        id
      },
      include: { student: true, address: true, parent: true }
    })
  } catch (error) {
    createLog('error', '[getCampApplicationById]', error)
    return null
  }
}
