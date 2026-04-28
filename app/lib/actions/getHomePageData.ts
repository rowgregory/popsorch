'use server'

import { unstable_cache } from 'next/cache'
import prisma from '@/prisma/client'
import { getPage } from './page/getPage'
import { getConcerts } from './concert/getConcerts'
import { getPhotoGalleryImages } from './photo-gallery-image/getPhotoGalleryImages'
import { getSponsors } from './sponsor/getSponsors'
import { getTestimonials } from './testimonial/getTestimonials'

async function fetchHomePageData() {
  const [pageData, concertsData, galleryData, sponsorsData, testimonialsData, events, news] = await Promise.all([
    getPage('home').catch(() => null),
    getConcerts().catch(() => ({ concerts: [] })),
    getPhotoGalleryImages().catch(() => []),
    getSponsors().catch(() => ({ data: [] })),
    getTestimonials().catch(() => ({ data: [] })),
    prisma.event
      .findMany({
        orderBy: { date: 'desc' },
        take: 10
      })
      .catch(() => []),
    prisma.news
      .findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        take: 5
      })
      .catch(() => [])
  ])

  return {
    pageData: pageData?.content,
    concerts: concertsData?.concerts,
    galleryImages: galleryData,
    sponsors: sponsorsData?.data,
    testimonials: testimonialsData.data,
    events,
    news
  }
}

export const getHomePageData = unstable_cache(
  fetchHomePageData,
  ['home-page-data'],
  { revalidate: 60 } // Cache for 60 seconds
)
