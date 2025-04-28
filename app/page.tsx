'use client'

import HomeBiography from './components/home/HomeBiography'
import HomeConcertDates from './components/home/HomeConcertDates'
import HomeContact from './components/home/HomeContact'
import HomeDiscount from './components/home/HomeDiscount'
import HomeHero from './components/home/HomeHero'
import HomeSignUp from './components/home/HomeSignUp'
import TicketsBlock from './components/home/TicketsBlock'

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeDiscount />
      <TicketsBlock />
      <HomeConcertDates />
      <HomeBiography />
      <HomeContact />
      <HomeSignUp />
    </>
  )
}

export default Home
