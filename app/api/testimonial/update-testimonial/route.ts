import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceTestimonial } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const { id, name, review } = body

    await prisma.testimonial.update({
      where: { id },
      data: { name, review }
    })

    await createLog('info', 'Testimonial updated', {
      location: ['testimonial route - PUT /api/testimonialr/update-testimonial'],
      message: `Testimonial successfully updated`,
      name: 'TestimonialUpdated',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceTestimonial }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Updating testimonial failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json(
      { message: 'Error updating testimonial', error, sliceName: sliceTestimonial },
      { status: 500 }
    )
  }
}
