import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceTestimonial } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const { name, review } = body

    const testimonial = await prisma.testimonial.create({
      data: { name, review }
    })

    await createLog('info', 'Testimonial created', {
      location: ['testimonial route - POST /api/testimonialr/create-testimonial'],
      message: `Testimonial successfully created`,
      name: 'TestimonialCreated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ testimonial, sliceName: sliceTestimonial }, { status: 201 })
  } catch (error: any) {
    await createLog('error', `Creating testimonial failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json(
      { message: 'Error creating testimonial', error, sliceName: sliceTestimonial },
      { status: 500 }
    )
  }
}
