'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'

export async function updateUserRole(userId: string, role: string) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    })

    await createLog('info', 'User role updated successfully', {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })

    return { user }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update user'

    await createLog('error', 'Failed to update user', {
      error: errorMessage,
      inputData: {
        userId
      }
    })

    throw new Error(errorMessage)
  }
}
