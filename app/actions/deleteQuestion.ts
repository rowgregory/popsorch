'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function deleteQuestion(questionId: string) {
  try {
    if (!questionId) {
      throw new Error('Question ID is required')
    }

    const question = await prisma.question.delete({
      where: { id: questionId }
    })

    await createLog('info', 'Question deleted successfully', {
      questionId: question.id,
      name: question.name,
      email: question.email
    })

    revalidateTag('Question', 'default')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete question'

    await createLog('error', 'Failed to delete question', {
      error: errorMessage,
      inputData: {
        questionId
      }
    })

    throw new Error(errorMessage)
  }
}
