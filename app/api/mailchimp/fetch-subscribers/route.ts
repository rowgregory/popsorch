import { NextRequest, NextResponse } from 'next/server'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceMailchimp } from '@/public/data/api.data'

export async function GET(req: NextRequest) {
  const API_KEY = process.env.MAILCHIMP_API_KEY!
  const LIST_ID = process.env.MAILCHIMP_LIST_ID!
  const DATACENTER = API_KEY.split('-')[1]

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members?count=50&offset=0&sort_field=timestamp_opt&sort_dir=DESC`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      await createLog('error', `Mailchimp API request failed: ${errorResponse.title}`, {
        errorLocation: parseStack(JSON.stringify(errorResponse)),
        errorMessage: errorResponse.detail,
        errorName: errorResponse.title,
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method
      })

      return NextResponse.json(
        { message: `Mailchimp API Error: ${response.statusText}`, sliceName: sliceMailchimp },
        { status: response.status }
      )
    }

    const data = await response.json()

    const members = data.members.map((member: any) => ({
      email: member.email_address,
      status: member.status,
      name: member.full_name,
      phoneNumber: member.merge_fields.MMERGE3,
      address: member.merge_fields.MMERGE4,
      interests: {
        isOption1: member.interests['05e5e5fd1e'],
        isOption2: member.interests['23e4855071'],
        isOption3: member.interests['f02e8752c1'],
        isOption4: member.interests['4d63e535d9'],
        isNewPatron: member.interests['21dd6933b9'],
        agreedToPrivacyStatement: member.interests['2b3f9c51d8']
      },
      stats: {
        avgOpenRate: member.stats.avg_open_rate,
        avgClickRate: member.stats.avg_click_rate
      },
      createdAt: member.timestamp_opt,
      contactId: member.contact_id,
      ipOpt: member.ip_opt
    }))

    await createLog('info', 'Fetched Mailchimp subscribers successfully', {
      location: ['fetch route - GET /api/fetch-subscribers'],
      message: `Fetched ${members.length} subscribers`,
      name: 'MailchimpFetchSubscribersSuccess',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ members, sliceName: sliceMailchimp, totalItems: data.total_items }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Failed to fetch Mailchimp subscribers: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })

    return NextResponse.json({ error: 'Failed to fetch subscribers', sliceName: sliceMailchimp }, { status: 500 })
  }
}
