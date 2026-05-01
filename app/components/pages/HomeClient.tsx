'use client'

import HomeHero from '../home/HomeHero'
import { ContactUsBlock } from '../home/ContactUsBlock'
import SponsorsBlock from '../home/SponsorsBlock'
import KeepUpToDateBlock from '../home/KeepUpToDateBlock'
import { useRef } from 'react'
import { ConcertsBlock } from '../home/ConcertsBlock'
import { TestimonialsBlock } from '../v2/sections/TestimonialsBlock'
import { EventsBlock } from '../v2/sections/EventsBlock'
import { NewsBlock } from '../v2/sections/NewsBlock'
import { SeasonDates } from '../home/SeasonDates'

export function HomeClient({ pageData, concerts, galleryImages, sponsors, testimonials, events, news }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <HomeHero pageData={pageData} ref={scrollRef} galleryImages={galleryImages} />
      <div ref={scrollRef}>
        <ConcertsBlock pageData={pageData} concerts={concerts} />
      </div>
      <SeasonDates />
      <ContactUsBlock data={pageData} />
      <SponsorsBlock pageData={pageData} sponsors={sponsors} />
      <KeepUpToDateBlock pageData={pageData} />
      <TestimonialsBlock testimonials={testimonials} />
      <EventsBlock events={events} />
      <NewsBlock news={news} />
    </>
  )
}
