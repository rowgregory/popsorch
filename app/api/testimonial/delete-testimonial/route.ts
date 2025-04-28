import { createLog } from '@/app/utils/logHelper'
import prisma from '@/prisma/client'
import { sliceTestimonial } from '@/public/data/api.data'
import { parseStack } from 'error-stack-parser-es/lite'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  let parsedUser
  try {
    const body = await req.json()

    const userHeader = req.headers.get('x-user')! // Exlmation point <----
    parsedUser = JSON.parse(userHeader)

    const { id } = body

    await prisma.testimonial.delete({
      where: { id }
    })

    await createLog('info', 'Testimonial deleted', {
      location: ['testimonial route - DELETE /api/testimonial/delete-testimonial'],
      message: `Testimonial successfully deleted`,
      name: 'TestimonialDeleted',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })

    return NextResponse.json({ sliceName: sliceTestimonial }, { status: 200 })
  } catch (error: any) {
    await createLog('error', `Deleting testimonial failed: ${error.message}`, {
      errorLocation: parseStack(JSON.stringify(error)),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: req.url,
      method: req.method,
      user: parsedUser
    })
    return NextResponse.json(
      { message: 'Error deleting testimonial', error, sliceName: sliceTestimonial },
      { status: 500 }
    )
  }
}
