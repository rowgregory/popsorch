import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'
import { parseStack } from 'error-stack-parser-es/lite'
import { sliceTestimonial } from '@/public/data/api.data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const testimonials = await prisma.testimonial.findMany()

    return NextResponse.json({ testimonials, sliceName: sliceTestimonial }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Fetching testimonials failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method
    })
    return NextResponse.json(
      { message: 'Oops! Something went wrong loading testimonials.', error, sliceName: sliceTestimonial },
      { status: 500 }
    )
  }
}
