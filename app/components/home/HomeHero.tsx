import React from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import LogoWRobynHeader from '../LogoWRobynHeader'

const images = ['/images/h-1.png', '/images/h-2.png', '/images/ci-1.png', '/images/ci-2.png']

const HomeHero = () => {
  return (
    <div className="relative h-[1000px] w-full mt-[-160px]">
      <div className="absolute z-40 left-1/2 top-1/2 -translate-y-1/2 transform -translate-x-1/2">
        <div className="relative border-1 border-white py-9 px-20 after:absolute w-full max-w-[500px] hidden 760:block 760:w-[700px] after:inset-[-10px] after:border after:border-white after:content-['']">
          <LogoWRobynHeader imgDimensions="h-[280px]" logoClassname="text-blaze" />
        </div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 z-30 bg-black/40 w-full h-[1000px]"></div>
      <HomeHeroCarousel images={images} interval={5000} />
    </div>
  )
}

export default HomeHero
