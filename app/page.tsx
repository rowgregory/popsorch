'use client'

import { useRef } from 'react'
import HomeConcertDates from './components/home/HomeConcertDates'
import HomeContact from './components/home/HomeContact'
import HomeHero from './components/home/HomeHero'
import HomeSeatMaps from './components/home/HomeSeatMaps'
import HomeSignUp from './components/home/HomeSignUp'
import TicketsBlock from './components/home/TicketsBlock'
import SeasonPackageBanner from './components/home/SeasonPackageBanner'
import NeonSubscriptionBanner from './components/home/NeonSubscriptionBanner'

const Home = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <HomeHero handleScroll={handleScroll} />

      <SeasonPackageBanner />
      <div ref={scrollRef}>
        <HomeConcertDates />
      </div>
      <NeonSubscriptionBanner />
      <TicketsBlock />
      <HomeSeatMaps />
      <HomeContact />
      <HomeSignUp />
    </>
  )
}

export default Home
