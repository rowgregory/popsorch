import { NextRequest, NextResponse } from 'next/server'
import { formatPhoneNumberForMailchimp } from './string.functions'
import { createLog } from './logHelper'
import { parseStack } from 'error-stack-parser-es/lite'

const subscribeUser = async (
  interestMapping: Record<string, boolean>,
  API_KEY: string,
  DATACENTER: string,
  LIST_ID: string,
  address: { addr1?: string; city?: string; state?: string; zip?: string },
  user: { firstName?: string; lastName?: string; email: string; phoneNumber?: string },
  req: NextRequest
) => {
  const mergeFields: any = {
    FNAME: user?.firstName || '',
    LNAME: user?.lastName || '',
    EMAIL: user?.email
  }

  // Only add phone if it exists
  if (user?.phoneNumber) {
    mergeFields.MMERGE3 = formatPhoneNumberForMailchimp(user.phoneNumber)
  }

  // Only add address if at least addr1 exists
  if (address?.addr1) {
    mergeFields.MMERGE4 = {
      addr1: address?.addr1 || '',
      city: address?.city || '',
      state: address?.state || '',
      zip: address?.zip || '',
      country: 'US'
    }
  }

  const data: any = {
    email_address: user?.email,
    status: 'subscribed',
    merge_fields: mergeFields,
    interests: interestMapping
  }

  const subscribeResponse = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const subscribeResult = await subscribeResponse.json()

  if (!subscribeResponse.ok) {
    await createLog('error', `Mailchimp subscribe failed: ${subscribeResult.title}`, {
      errorLocation: parseStack(JSON.stringify(subscribeResult)),
      errorMessage: subscribeResult.detail,
      errorName: subscribeResult.title,
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json(
      {
        error: subscribeResult.title,
        detail: subscribeResult.detail,
        errors: subscribeResult.errors
      },
      { status: subscribeResponse.status }
    )
  }

  await createLog('info', 'User successfully subscribed to Mailchimp', {
    location: ['subscribe route - POST /api/subscribe'],
    message: `Subscribed email: ${user?.email}`,
    name: 'MailchimpSubscribeSuccess',
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method
  })

  return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 })
}

export default subscribeUser
