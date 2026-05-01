'use server'

import prisma from '@/prisma/client'
import { Resend } from 'resend'
import { adminWelcomeTemplate } from '../../email-templates/admin-welcome.template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function createAdminUser(email: string, firstName: string, lastName: string) {
  if (!email?.trim()) return { success: false, error: 'Email is required' }
  if (!firstName?.trim()) return { success: false, error: 'First name is required' }
  if (!lastName?.trim()) return { success: false, error: 'Last name is required' }

  const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null)
  if (existing) return { success: false, error: 'A user with this email already exists' }

  const user = await prisma.user
    .create({
      data: {
        email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: 'ADMIN'
      }
    })
    .catch(() => null)

  if (!user) return { success: false, error: 'Failed to create user' }

  const { error } = await resend.emails.send({
    from: 'The Pops Orchestra <noreply@thepopsorchestra.org>',
    to: email,
    subject: 'You have been added as an admin — The Pops Orchestra',
    html: adminWelcomeTemplate(firstName.trim(), email.trim())
  })

  if (error) return { success: true, emailFailed: true }
  return { success: true, emailFailed: false }
}
