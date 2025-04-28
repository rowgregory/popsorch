import useSingleImageCarousel from '@/app/hooks/useSingleImageCarousel'
import React, { FC } from 'react'
import Picture from '../common/Picture'

const HomeHeroCarousel: FC<{ images: string[]; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <Picture
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            image === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          priority={true}
        />
      ))}
    </div>
  )
}

export default HomeHeroCarousel
