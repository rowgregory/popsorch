import { FC } from 'react'
import useSingleImageCarousel from '@/app/hooks/useSingleImageCarousel'

export const HomeHeroCarousel: FC<{ images: any; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)
  return (
    <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
      {currentImage === undefined ? (
        <div
          style={{ backgroundImage: `url('/images/banner-1.jpg')` }}
          className="absolute inset-0 w-full h-full bg-top bg-no-repeat bg-cover"
        />
      ) : (
        images?.map((image: { imageUrl: string }, index: number) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${image.imageUrl})` }}
            className={`absolute inset-0 w-full h-full bg-top bg-no-repeat bg-cover transition-opacity duration-1000 ${
              image?.imageUrl === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))
      )}
    </div>
  )
}
