'use server'

import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import crypto from 'crypto'
import getInterestsMapping from '@/app/utils/mailchimp.getInterestsMapping'
import { subscribeUser } from '@/app/utils/mailchimp.subscribeUser'

interface SubscribeInput {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  addr1: string
  city: string
  state: string
  zip: string
  isOption1: boolean
  isOption2: boolean
  isOption3: boolean
  isOption4: boolean
  isNewPatron: boolean
  agreedToPrivacyStatement: boolean
}

export async function subscribeToMailchimp(data: SubscribeInput) {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    addr1,
    city,
    state,
    zip,
    isOption1,
    isOption2,
    isOption3,
    isOption4,
    isNewPatron,
    agreedToPrivacyStatement
  } = data

  if (!email) return { success: false, error: 'Email is required' }

  const API_KEY = process.env.MAILCHIMP_API_KEY!
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!

  if (!API_KEY || !LIST_ID) return { success: false, error: 'Mailchimp environment variables are not configured' }

  const DATACENTER = API_KEY.split('-')[1]
  const BASE_URL = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}`

  const getOptions = {
    method: 'GET',
    headers: {
      Authorization: `apikey ${API_KEY}`,
      'Content-Type': 'application/json'
    }
  }

  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
  const res = await fetch(`${BASE_URL}/members/${hash}`, getOptions)
  const result = await res.json()

  if (res.status !== 404 && !(res.status === 400 && result?.detail?.includes('permanently deleted'))) {
    return { success: false, error: 'Email already subscribed' }
  }

  const user = { firstName, lastName, email, phoneNumber }
  const address = { addr1, city, state, zip }

  const interests = ['05e5e5fd1e', '23e4855071', 'f02e8752c1', '4d63e535d9']
  const privacyInterestsId = '21dd6933b9'
  const newPatronInterestsId = '2b3f9c51d8'

  const interestMapping = await getInterestsMapping(
    isOption1,
    isOption2,
    isOption3,
    isOption4,
    agreedToPrivacyStatement,
    isNewPatron,
    interests,
    privacyInterestsId,
    newPatronInterestsId
  )

  const subscribeResult = await subscribeUser(interestMapping, API_KEY, DATACENTER, LIST_ID, address, user).catch(
    async (error: any) => {
      await createLog('error', `Subscribing to Mailchimp failed: ${error.message}`, {
        errorLocation: parseStack(JSON.stringify(error)),
        errorMessage: error.message,
        errorName: error.name || 'UnknownError',
        timestamp: new Date().toISOString()
      }).catch(() => null)

      return null
    }
  )

  if (!subscribeResult) return { success: false, error: 'Subscription failed' }

  return { success: true, data: subscribeResult }
}
