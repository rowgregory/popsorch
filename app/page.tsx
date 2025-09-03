'use client'

import { useRef } from 'react'
import HomeConcertDates from './components/home/HomeConcertDates'
import HomeContact from './components/home/HomeContact'
import HomeHero from './components/home/HomeHero'
import HomeSignUp from './components/home/HomeSignUp'
import TicketsBlock from './components/home/TicketsBlock'
import SponsorsBlock from './components/blocks/SponsorsBlock'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <HomeHero handleScroll={handleScroll} />
      <TicketsBlock />
      <div ref={scrollRef}>
        <HomeConcertDates />
      </div>
      <HomeContact />
      <SponsorsBlock />
      <HomeSignUp />
    </>
  )
}

export default Home
