import prisma from '@/prisma/client'

export async function getTestimonials() {
  const testimonials = await prisma.testimonial
    .findMany({
      orderBy: { createdAt: 'desc' }
    })
    .catch(() => [])

  return { data: testimonials }
}
