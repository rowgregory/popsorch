import Image from 'next/image'
import React, { FC, memo, MouseEventHandler } from 'react'

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
  sizes = '100vw'
}) => {
  // If fill is true, don't use width/height
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
        unoptimized
        style={{ objectFit: 'cover' }}
      />
    )
  }

  // Otherwise use width/height
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
      unoptimized
      decoding="async"
      style={{ contentVisibility: 'auto' }}
    />
  )
}

export default memo(Picture)
