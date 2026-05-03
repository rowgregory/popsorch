import useSingleImageCarousel from '@/app/lib/hooks/useSingleImageCarousel'
import { FC } from 'react'
import Picture from '../common/Picture'

export const HeroCarousel: FC<{ images: any; interval: number }> = ({ images, interval = 3000 }) => {
  const currentImage = useSingleImageCarousel(images, interval)

  if (!images?.length) {
    return (
      <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
        <Picture src="/images/hero-1.webp" alt="" fill priority className="object-cover object-top" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden" role="presentation" aria-hidden="true">
      {/* First image rendered statically — browser parser sees this immediately */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/_next/image?url=${encodeURIComponent(images[0].imageUrl)}&w=1920&q=75`}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-top"
          style={{ opacity: currentImage === images[0].imageUrl || !currentImage ? 1 : 0, transition: 'opacity 1s' }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Remaining images via Picture — JS rendered */}
      {images.slice(1).map((image: { imageUrl: string }, index: number) => (
        <div
          key={index + 1}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            image?.imageUrl === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Picture
            src={image.imageUrl}
            alt=""
            fill
            priority={false}
            quality={50}
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}
    </div>
  )
}
