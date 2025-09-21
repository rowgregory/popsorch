// app/api/submit-quote/route.ts (App Router)
import { NextRequest, NextResponse } from 'next/server'

interface QuoteRequest {
  name: string
  companyName: string
  email: string
  phone: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.companyName || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Forward request to sqysh.io
    const response = await fetch('https://sqysh.io/api/quote?endpoint=REQUEST_A_QUOTE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: {
          name: body.name,
          companyName: body.companyName,
          email: body.email,
          phone: body.phone,
          message: body.message
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to submit quote' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error', message: error?.data?.message }, { status: 500 })
  }
}
