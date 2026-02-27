'use server'

import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })

    revalidatePath('/admin/users')

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to delete user.' }
  }
}
