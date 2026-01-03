'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'

interface CreateQuestionInput {
  name: string
  email?: string
  message?: string
  hasResponded?: boolean
}

export async function createQuestion(data: CreateQuestionInput) {
  try {
    const question = await prisma.question.create({
      data: {
        name: data.name,
        email: data.email || '',
        message: data.message
      }
    })

    await createLog('info', 'Question created successfully', {
      questionId: question.id,
      name: question.name,
      email: question.email
    })

    revalidateTag('Question', 'default')
    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create question'

    await createLog('error', 'Failed to create question', {
      error: errorMessage,
      inputData: {
        name: data.name,
        email: data.email
      }
    })

    throw new Error(errorMessage)
  }
}
