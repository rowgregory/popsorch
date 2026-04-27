'use server'

import { createLog } from '@/app/utils/logHelper'
import { getActor } from '../user/getActor'
import prisma from '@/prisma/client'
import { TestimonialInput } from '@/app/types/entities/testimonial'

export async function createTestimonial(data: TestimonialInput) {
  if (!data.quote) return { success: false, error: 'Quote is required' }
  if (!data.author) return { success: false, error: 'Author is required' }

  const actor = await getActor()

  const testimonial = await prisma.testimonial
    .create({
      data: {
        quote: data.quote,
        author: data.author,
        title: data.title ?? '',
        isPublished: data.isPublished ?? false
      }
    })
    .catch(() => null)

  if (!testimonial) return { success: false, error: 'Failed to create testimonial' }

  await createLog('info', `Testimonial by "${testimonial.author}" created`, {
    testimonialId: testimonial.id,
    createdBy: actor
  }).catch(() => null)

  return { success: true, data: testimonial }
}
