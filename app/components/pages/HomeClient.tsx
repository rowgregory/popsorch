'use client'

import { useRef } from 'react'
import HomeHero from '../home/HomeHero'
import ConcertsBlock from '../home/ConcertsBlock'
import ContactUsBlock from '../home/ContactUsBlock'
import SponsorsBlock from '../home/SponsorsBlock'
import KeepUpToDateBlock from '../home/KeepUpToDateBlock'

const HomeClient = ({ pageData, concerts, galleryImages, sponsors }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <HomeHero pageData={pageData} ref={scrollRef} galleryImages={galleryImages} />
      <div ref={scrollRef}>
        <ConcertsBlock pageData={pageData} concerts={concerts} />
      </div>
      <ContactUsBlock pageData={pageData} />
      <SponsorsBlock pageData={pageData} sponsors={sponsors} />
      <KeepUpToDateBlock pageData={pageData} />
    </>
  )
}

export default HomeClient
