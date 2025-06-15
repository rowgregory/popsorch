import useSingleImageCarousel from '@/app/hooks/useSingleImageCarousel'
import React, { FC } from 'react'

const HomeHeroCarousel: FC<{ images: any; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images?.map((image: { imageUrl: string }, index: number) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${image.imageUrl})` }}
          className={`bg-no-repeat bg-cover origin-bottom w-full h-full absolute transition-opacity duration-1000 ${
            image?.imageUrl === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 z-40 h-48 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10" />
    </div>
  )
}

export default HomeHeroCarousel
