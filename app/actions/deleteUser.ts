'use server'

import prisma from '@/prisma/client'

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete user.' }
  }
}
