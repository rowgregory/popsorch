import prisma from '@/prisma/client'
import { getConcerts } from './lib/actions/concert/getConcerts'
import { getPage } from './lib/actions/page/getPage'
import { getPhotoGalleryImages } from './lib/actions/photo-gallery-image/getPhotoGalleryImages'
import { getSponsors } from './lib/actions/sponsor/getSponsors'
import { HomeClient } from './components/pages/HomeClient'
import { getTestimonials } from './lib/actions/testimonial/getTestimonials'

export default async function HomePage() {
  const [pageData, concertsData, galleryData, sponsorsData, testimonialsData, events, news] = await Promise.all([
    getPage('home'),
    getConcerts(),
    getPhotoGalleryImages(),
    getSponsors(),
    getTestimonials(),
    prisma.event.findMany(),
    prisma.news.findMany()
  ])

  return (
    <HomeClient
      pageData={pageData?.content}
      concerts={concertsData?.concerts}
      galleryImages={galleryData}
      sponsors={sponsorsData?.data}
      testimonials={testimonialsData.data}
      events={events}
      news={news}
    />
  )
}
