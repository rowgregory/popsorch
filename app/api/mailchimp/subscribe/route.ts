import { NextRequest, NextResponse } from 'next/server'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import crypto from 'crypto'
import { sliceMailchimp } from '@/public/data/api.data'
import getInterestsMapping from '@/app/utils/mailchimp.getInterestsMapping'
import subscribeUser from '@/app/utils/mailchimp.subscribeUser'

export async function POST(req: NextRequest) {
  try {
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
    } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY!
    const LIST_ID = process.env.MAILCHIMP_LIST_ID!
    const DATACENTER = API_KEY.split('-')[1]

    const BASE_URL = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}`
    const getOptions = {
      method: 'GET',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    }

    const getSubscriber = async (email: string) => {
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
      const res = await fetch(`${BASE_URL}/members/${hash}`, getOptions)
      const data = await res.json()
      return { status: res.status, data }
    }

    const { status, data: result } = await getSubscriber(email)

    if (status !== 404 && !(status === 400 && result?.detail?.includes('permanently deleted'))) {
      return NextResponse.json(
        { message: 'Email already subscribed', status, sliceName: sliceMailchimp },
        { status: 404 }
      )
    }

    const user = {
      firstName,
      lastName,
      email,
      phoneNumber
    }

    const address = {
      addr1,
      city,
      state,
      zip
    }

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

    return await subscribeUser(interestMapping, API_KEY, DATACENTER, LIST_ID, address, user, req)
  } catch (error: any) {
    await createLog('error', `Subscribing to Mailchimp failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ error: 'Subscription failed', sliceName: sliceMailchimp }, { status: 500 })
  }
}
