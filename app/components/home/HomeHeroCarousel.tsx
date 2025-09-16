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
          className={`absolute inset-0 w-full h-full bg-top bg-no-repeat bg-cover sm:bg-cover md:bg-cover lg:bg-cover xl:bg-cover transition-opacity duration-1000 ${
            image?.imageUrl === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Bottom gradient for better text contrast */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

      {/* Top gradient for header area */}
      <div className="absolute top-0 left-0 right-0 z-30 h-20 sm:h-24 md:h-28 lg:h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
    </div>
  )
}

export default HomeHeroCarousel
