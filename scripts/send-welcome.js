import prisma from '../prisma/client.ts'
import { Resend } from 'resend'
import { welcomeTemplate } from '../app/lib/email-templates/welcome.ts'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendWelcome() {
  console.log('🚀 Sending welcome emails...')

  try {
    const users = await prisma.user.findMany({
      where: {
        role: { in: ['ADMIN', 'SUPERUSER'] },
        NOT: { email: 'robyn@thepopsorchestra.org' }
      }
    })
    if (!users.length) {
      console.log('❌ No admin users found')
      return
    }

    console.log(`📋 Found ${users.length} users`)

    const results = []
    const BATCH_SIZE = 2
    const DELAY_MS = 1000

    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE)

      const batchPromises = batch.map(async (user) => {
        try {
          const result = await resend.emails.send({
            from: 'The Pops Orchestra <noreply@thepopsorchestra.org>',
            to: user.email,
            subject: 'Automated emails are now live',
            html: welcomeTemplate()
          })
          console.log(`✅ Sent to ${user.email}`)
          return { success: true, email: user.email, result }
        } catch (error) {
          console.error(`❌ Failed to send to ${user.email}:`, error)
          return { success: false, email: user.email, error: error.message }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      if (i + BATCH_SIZE < users.length) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS))
      }
    }

    const successful = results.filter((r) => r.success).length
    const failed = results.filter((r) => !r.success).length
    const failedEmails = results.filter((r) => !r.success).map((r) => ({ email: r.email, error: r.error }))

    await prisma.log.create({
      data: {
        level: 'info',
        message: 'Welcome emails sent',
        metadata: JSON.stringify({
          location: ['script - scripts/send-welcome.ts'],
          name: 'WelcomeEmailsSent',
          timestamp: new Date().toISOString(),
          totalUsers: users.length,
          successfulEmails: successful,
          failedEmails: failed
        })
      }
    })

    if (failed > 0) {
      await prisma.log.create({
        data: {
          level: 'error',
          message: 'Some welcome emails failed',
          metadata: JSON.stringify({
            location: ['script - scripts/send-welcome.ts'],
            name: 'WelcomeEmailsPartialFailure',
            timestamp: new Date().toISOString(),
            failedCount: failed,
            failures: failedEmails
          })
        }
      })
    }

    console.log(`\n📊 Results: ${successful}/${users.length} sent successfully`)
    if (failed > 0)
      console.log(
        `⚠️  ${failed} failed:`,
        failedEmails.map((r) => r.email)
      )
  } catch (error) {
    await prisma.log.create({
      data: {
        level: 'error',
        message: 'Welcome email script fatal error',
        metadata: JSON.stringify({
          location: ['script - scripts/send-welcome.ts'],
          name: 'WelcomeEmailScriptError',
          timestamp: new Date().toISOString(),
          error: error.message,
          stack: error.stack
        })
      }
    })

    console.error('💥 Fatal error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

sendWelcome()
