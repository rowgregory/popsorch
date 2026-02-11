'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface UpdateUserInput {
  firstName?: string
  lastName?: string
  isSoundEffectsOn?: boolean
}

export async function updateUser(userId: string, data: UpdateUserInput) {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(typeof data.isSoundEffectsOn === 'boolean' && { isSoundEffectsOn: data.isSoundEffectsOn })
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        isSoundEffectsOn: true,
        updatedAt: true
      }
    })

    await createLog('info', 'User updated successfully', {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })

    revalidateTag('User', 'max')
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
