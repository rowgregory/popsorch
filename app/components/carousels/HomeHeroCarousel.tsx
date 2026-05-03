import useSingleImageCarousel from '@/app/lib/hooks/useSingleImageCarousel'
import { FC } from 'react'
import Picture from '../common/Picture'

export const HomeHeroCarousel: FC<{ images: any; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)

  // Always render the images array, no fallback swap
  if (!images?.length) {
    return (
      <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
        <Picture src="/images/hero-1.webp" alt="" fill priority className="object-cover object-top" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
      {images.map((image: { imageUrl: string }, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            image?.imageUrl === currentImage || (index === 0 && !currentImage) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Picture
            src={image.imageUrl}
            alt=""
            fill
            priority={index === 0}
            quality={60}
            className="object-cover object-top"
            sizes="100vw" // already correct for full-width hero
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}
    </div>
  )
}
