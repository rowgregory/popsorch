import type { EmailConfig } from 'next-auth/providers/email'
import { createLog } from '@/app/utils/logHelper'
import { magicLinkTemplate } from '../email-templates/magic-link'
import { resend } from '../resend'

export const magicLinkProvider: EmailConfig = {
  id: 'email',
  name: 'Email',
  type: 'email',
  maxAge: 15 * 60, // 15 mins
  from: process.env.RESEND_EMAIL!,
  sendVerificationRequest: async ({ identifier: email, url, provider }) => {
    try {
      const result = await resend.emails.send({
        from: `The Pops Orchestra of Bradenton & Sarasota <${provider.from!}>`,
        to: email,
        subject: 'Sign in to The Pops Orchestra of Bradenton & Sarasota',
        html: magicLinkTemplate(url)
      })

      await createLog('info', 'Magic link sent successfully', {
        location: ['magicLinkProvider.ts'],
        email,
        messageId: result.data?.id
      })
    } catch (error) {
      await createLog('error', 'Failed to send magic link email', {
        location: ['magicLinkProvider.ts'],
        email,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      throw error
    }
  }
}
