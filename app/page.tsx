'use client'

import DirectionsBlock from './components/blocks/DirectionsBlock'
import TheShopBlock from './components/blocks/TheShopBlock'
import ImageMarqueeBlock from './components/blocks/ImageMarqueeBlock'
import SponsorsBlock from './components/blocks/SponsorsBlock'
// import HomeHeader from './components/header/HomeHeader'
import HomeBanner from './components/home/HomeBanner'
import CountdownBlock from './components/blocks/CountdownBlock'
import CurrentEventBlock from './components/blocks/CurrentEventBlock'
import HighlightsBlock from './components/blocks/HighlightsBlock'
import LineUpBlock from './components/blocks/LineUpBlock'
import MarqueeBlock from './components/blocks/MarqueeBlock'
import TicketsBlock from './components/blocks/TicketsBlock'

const Home = () => {
  return (
    <>
      {/* <HomeHeader /> */}
      <HomeBanner />
      <CountdownBlock />
      <CurrentEventBlock />
      <HighlightsBlock />
      <LineUpBlock />
      <MarqueeBlock />
      <TicketsBlock />
      <SponsorsBlock />
      <ImageMarqueeBlock />
      <TheShopBlock />
      <DirectionsBlock />
    </>
  )
}

export default Home
