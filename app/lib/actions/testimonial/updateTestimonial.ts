'use server'

import { TestimonialInput } from '@/app/types/entities/testimonial'
import { getActor } from '../user/getActor'
import prisma from '@/prisma/client'
import { createLog } from '@/app/utils/logHelper'

export async function updateTestimonial(id: string, data: TestimonialInput) {
  if (!id) return { success: false, error: 'Testimonial ID is required' }
  if (!data.quote) return { success: false, error: 'Quote is required' }
  if (!data.author) return { success: false, error: 'Author is required' }

  const actor = await getActor()

  const testimonial = await prisma.testimonial
    .update({
      where: { id },
      data: {
        quote: data.quote,
        author: data.author,
        title: data.title ?? '',
        isPublished: data.isPublished ?? false
      }
    })
    .catch(() => null)

  if (!testimonial) return { success: false, error: 'Failed to update testimonial' }

  await createLog('info', `Testimonial by "${testimonial.author}" updated`, {
    testimonialId: testimonial.id,
    updatedBy: actor
  }).catch(() => null)

  return { success: true, data: testimonial }
}
