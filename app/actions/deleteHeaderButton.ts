'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export async function deleteHeaderButton(headerButtonId: string) {
  try {
    if (!headerButtonId) {
      throw new Error('Header button ID is required')
    }

    const headerButton = await prisma.headerButton.delete({
      where: { id: headerButtonId }
    })

    await createLog('info', 'HeaderButton deleted successfully', {
      headerButtonId: headerButton.id
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete header button'

    await createLog('error', 'Failed to delete header button', {
      error: errorMessage,
      inputData: {
        headerButtonId
      }
    })

    throw new Error(errorMessage)
  }
}
