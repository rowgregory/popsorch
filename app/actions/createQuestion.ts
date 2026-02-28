'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'
import { contactSubmissionTemplate } from '../lib/email-templates/contact-submission'
import { resend } from '../lib/resend'

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

    await resend.emails.send({
      from: 'New Submission! <noreply@thepopsorchestra.org>',
      to: ['info@thepopsorchestra.org', 'robyn@thepopsorchestra.org'],
      subject: 'New contact form submission',
      html: contactSubmissionTemplate(data.name)
    })

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
