'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { createLog } from '../utils/logHelper'
import { sendAdminPushNotification } from './sendAdminPushNotification'

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

    await sendAdminPushNotification(
      `New message from ${data.name}: ${data.message.substring(0, 50)}${data.message.length > 50 ? '...' : ''}`,
      'New Contact Form Submission'
    )
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
