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
}

const Picture: FC<PictureProps> = ({ src, alt, className, priority = false, onClick, width, height }) => {
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
      sizes="100vw"
      unoptimized
      decoding="async"
      style={{ contentVisibility: 'auto' }}
    />
  )
}

export default memo(Picture)
