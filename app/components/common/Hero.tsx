'use client'

import { FC } from 'react'

interface HeroProps {
  src: string
  title: string
}

const Hero: FC<HeroProps> = ({ src, title }) => {
  return (
    <div className="relative w-full h-60 sm:h-96 overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full  bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${src})`,
          backgroundAttachment: 'fixed' // Makes the image completely stationary
        }}
      />

      {/* Overlay Content */}
      <div
        className="absolute z-10 top-1/2 bg-black/30 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col w-full 
        h-full flex justify-center px-3"
      >
        <div className="max-w-screen-md mx-auto w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-center">{title}</h1>
        </div>
      </div>
    </div>
  )
}

export default Hero
