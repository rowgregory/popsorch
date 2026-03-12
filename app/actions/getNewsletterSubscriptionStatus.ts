'use server'

import prisma from '@/prisma/client'
import { createLog } from '../utils/logHelper'
import { auth } from '../lib/auth'

export const getNewsletterSubscriptionStatus = async () => {
  const session = await auth()
  try {
    const newsletter = await prisma.newsletter.findUnique({
      where: { email: session.user?.email }
    })

    return { isSubscribed: !!newsletter }
  } catch (error) {
    createLog('error', '[getNewsletterSubscriptionStatus]', error)
    return { isSubscribed: false }
  }
}
