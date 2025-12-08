'use client'

import { useRef } from 'react'
import ConcertsBlock from './components/home/ConcertsBlock'
import ContactUsBlock from './components/home/ContactUsBlock'
import HomeHero from './components/home/HomeHero'
import KeepUpToDateBlock from './components/home/KeepUpToDateBlock'
import TicketsBlock from './components/home/TicketsBlock'
import SponsorsBlock from './components/home/SponsorsBlock'
import { sendGAEvent } from '@next/third-parties/google'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    sendGAEvent('event', 'view_concerts', {
      value: 'see_concerts',
      button_text: 'See Concerts',
      section: 'home_hero',
      user_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
      time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
      referrer: document.referrer || 'direct',
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      timestamp: new Date().toISOString()
    })
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <HomeHero handleScroll={handleScroll} />
      <TicketsBlock />
      <div ref={scrollRef}>
        <ConcertsBlock />
      </div>
      <ContactUsBlock />
      <SponsorsBlock />
      <KeepUpToDateBlock />
    </>
  )
}

export default Home
