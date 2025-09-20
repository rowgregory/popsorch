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
    </div>
  )
}

export default HomeHeroCarousel
