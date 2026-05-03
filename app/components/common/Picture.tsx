import Image from 'next/image'
import { FC, memo, MouseEventHandler } from 'react'

interface PictureProps {
  src: string
  alt?: string
  className: string
  priority?: boolean
  onClick?: MouseEventHandler<HTMLImageElement>
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  quality?: number
}

const Picture: FC<PictureProps> = ({
  src,
  alt,
  className,
  priority = false,
  onClick,
  width,
  height,
  fill,
  sizes = '100vw',
  quality
}) => {
  if (fill) {
    return (
      <Image
        onClick={onClick}
        src={src}
        alt={alt || 'The Pops'}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <Image
      onClick={onClick}
      src={src}
      alt={alt || 'The Pops'}
      width={width || 500}
      height={height || 500}
      className={className}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      quality={quality ?? 75}
      decoding="async"
      style={{ contentVisibility: 'auto' }}
    />
  )
}

export default memo(Picture)
