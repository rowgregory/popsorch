'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

export async function updateQuestion(questionId: string) {
  try {
    if (!questionId) {
      throw new Error('Question ID is required')
    }

    // Get current question to toggle hasResponded
    const question = await prisma.question.findUnique({
      where: { id: questionId }
    })

    if (!question) {
      throw new Error('Question not found')
    }

    // Toggle the hasResponded boolean
    const updatedQuestion = await prisma.question.update({
      where: { id: questionId },
      data: {
        hasResponded: !question.hasResponded
      }
    })

    await createLog('info', 'Question updated successfully', {
      questionId: updatedQuestion.id,
      name: updatedQuestion.name,
      email: updatedQuestion.email
    })

    revalidateTag('Question', 'default')
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update question'

    await createLog('error', 'Failed to update question', {
      error: errorMessage,
      inputData: {
        questionId
      }
    })

    throw new Error(errorMessage)
  }
}
