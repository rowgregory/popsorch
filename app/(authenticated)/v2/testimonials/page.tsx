import TestimonialsClient from '@/app/components/pages/TestimonialsClient'
import prisma from '@/prisma/client'

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial
    .findMany({
      orderBy: { createdAt: 'asc' }
    })
    .catch(() => [])

  return <TestimonialsClient testimonials={testimonials} />
}
