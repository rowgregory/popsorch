import useSingleImageCarousel from '@/app/lib/hooks/useSingleImageCarousel'
import { FC } from 'react'
import Picture from '../common/Picture'

export const HomeHeroCarousel: FC<{ images: any; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)

  return (
    <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
      {currentImage === undefined ? (
        <Picture src="/images/banner-1.jpg" alt="" fill priority className="object-cover object-top" />
      ) : (
        images?.map((image: { imageUrl: string }, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              image?.imageUrl === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Picture src={image.imageUrl} alt="" fill priority={index === 0} className="object-cover object-top" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))
      )}
    </div>
  )
}
