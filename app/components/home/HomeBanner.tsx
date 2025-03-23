import useSingleImageCarousel from '@/app/hooks/useSingleImageCarousel'
import React, { FC } from 'react'
import Picture from '../common/Picture'

const ImageCarousel: FC<{ images: string[]; interval: number }> = ({ images, interval = 3000 }) => {
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
const images = ['/images/ci-1.png', '/images/ci-2.png']

const HomeBanner = () => {
  return (
    <div className="relative h-[622px] 1200:h-[750px] w-full">
      <ImageCarousel images={images} interval={5000} />
    </div>
  )
}

export default HomeBanner
