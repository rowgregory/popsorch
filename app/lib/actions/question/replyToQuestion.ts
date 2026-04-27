'use server'

import prisma from '@/prisma/client'
import { resend } from '../../resend'
import { replyToQuestionTemplate } from '../../email-templates/reply-to-question.template'

interface ReplyInput {
  questionId: string
  toEmail: string
  toName: string
  originalMessage: string
  replyMessage: string
}

export async function replyToQuestion(data: ReplyInput) {
  if (!data.questionId) return { success: false, error: 'Question ID is required' }
  if (!data.replyMessage) return { success: false, error: 'Reply message is required' }

  const { error } = await resend.emails.send({
    from: 'The Pops Orchestra <info@thepopsorchestra.org>',
    to: data.toEmail,
    subject: 'Re: Your inquiry to The Pops Orchestra',
    html: replyToQuestionTemplate(data.toName, data.replyMessage, data.originalMessage)
  })

  if (error) return { success: false, error: 'Failed to send email' }

  // Mark as responded
  const question = await prisma.question
    .update({
      where: { id: data.questionId },
      data: { hasResponded: true }
    })
    .catch(() => null)

  if (!question) return { success: false, error: 'Email sent but failed to update status' }

  return { success: true }
}
