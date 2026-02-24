'use server'

import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'
import prisma from '@/prisma/client'

export async function deleteCampApplication(id: string) {
  try {
    await prisma.campApplication.delete({
      where: { id }
    })

    await createLog('info', 'Camp application deleted successfully', {
      applicationId: id
    })

    revalidateTag('CampApplication', 'default')

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete camp application'

    await createLog('error', 'Failed to delete camp application', {
      error: errorMessage,
      applicationId: id
    })

    throw new Error(errorMessage)
  }
}
