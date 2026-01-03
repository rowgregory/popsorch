'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'
import { revalidateTag } from 'next/cache'

export async function assignHeaderButton(buttonId: string) {
  try {
    if (!buttonId) {
      throw new Error('Button ID is required')
    }

    // Verify button exists
    const button = await prisma.headerButton.findUnique({
      where: { id: buttonId }
    })

    if (!button) {
      throw new Error('Button not found')
    }

    await createLog('info', 'Starting header button assignment', { buttonId })

    // Use transaction to set all inactive and activate selected button
    const result = await prisma.$transaction([
      prisma.headerButton.updateMany({
        data: { isActive: false }
      }),
      prisma.headerButton.update({
        where: { id: buttonId },
        data: { isActive: true }
      })
    ])

    const updatedButton = result[1]

    await createLog('info', 'Header button assigned successfully', {
      buttonId,
      buttonName: updatedButton.text
    })

    revalidateTag('Header-Button', 'default')
    return { success: true, headerButton: updatedButton }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to assign header button'

    await createLog('error', 'Failed to assign header button', {
      error: errorMessage,
      buttonId
    })

    throw new Error(errorMessage)
  }
}
