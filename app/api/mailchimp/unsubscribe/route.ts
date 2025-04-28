import { NextRequest, NextResponse } from 'next/server'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import crypto from 'crypto'

export async function PATCH(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Ensure email is in lowercase for consistency
    const normalizedEmail = email.toLowerCase()

    const API_KEY = process.env.MAILCHIMP_API_KEY!
    const LIST_ID = process.env.MAILCHIMP_LIST_ID!
    const DATACENTER = API_KEY.split('-')[1]

    // Generate the subscriber hash
    const subscriberHash = crypto.createHash('md5').update(normalizedEmail).digest('hex')
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${subscriberHash}`

    // Data to update the member
    const updateData = {
      status: 'unsubscribed'
    }

    // Sending the PATCH request to Mailchimp API
    const updateResponse = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    })

    const updateResult = await updateResponse.json()

    if (!updateResponse.ok) {
      // Log the error if the update fails
      await createLog('error', `Mailchimp unsubscribe failed: ${updateResult.title}`, {
        errorLocation: parseStack(JSON.stringify(updateResult)),
        errorMessage: updateResult.detail,
        errorName: updateResult.title,
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json(
        { error: updateResult.title, detail: updateResult.detail },
        { status: updateResponse.status }
      )
    }

    // Log successful unsubscription
    await createLog('info', 'User successfully unsubscribed from Mailchimp', {
      location: ['unsubscribe route - PATCH /api/unsubscribe'],
      message: `Unsubscribed email: ${email}`,
      name: 'MailchimpUnsubscribeSuccess',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ message: 'Unsubscribed successfully' }, { status: 200 })
  } catch (error: any) {
    // Log any errors that occur
    await createLog('error', `Unsubscribing from Mailchimp failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ error: 'Unsubscription failed' }, { status: 500 })
  }
}
