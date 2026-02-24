'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Picture from '../common/Picture'

const MediaPhotoCarousel = ({ photoGalleryImages }) => {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = photoGalleryImages?.length ?? 0
  const shouldLoop = total >= 3

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total)
  }, [total])

  useEffect(() => {
    if (!shouldLoop) return
    intervalRef.current = setInterval(next, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next, shouldLoop])

  if (!total) return null

  return (
    <div className="relative w-full mx-auto pb-12">
      <div className="relative h-175 rounded-xl overflow-hidden">
        {photoGalleryImages.map((photoGalleryImage, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Picture
              src={photoGalleryImage.imageUrl}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-2">
        {photoGalleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default MediaPhotoCarousel
