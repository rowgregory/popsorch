import prisma from '@/prisma/client'

export async function getTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return { data: testimonials }
}
