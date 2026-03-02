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

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }, [total])

  const pauseInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const resumeInterval = () => {
    if (!shouldLoop) return
    intervalRef.current = setInterval(next, 3000)
  }

  useEffect(() => {
    if (!shouldLoop) return
    intervalRef.current = setInterval(next, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next, shouldLoop])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  if (!total) return null

  return (
    <section
      aria-label="Photo gallery carousel"
      aria-roledescription="carousel"
      className="relative w-full mx-auto"
      onMouseEnter={pauseInterval}
      onMouseLeave={resumeInterval}
      onFocus={pauseInterval}
      onBlur={resumeInterval}
    >
      {/* Slides */}
      <div className="relative h-[60vw] max-h-175 min-h-75 overflow-hidden" aria-live="polite" aria-atomic="true">
        {photoGalleryImages.map((photoGalleryImage, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${total}`}
            aria-hidden={i !== current}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Picture
              src={photoGalleryImage.imageUrl}
              alt={
                photoGalleryImage.imageFilename
                  ? photoGalleryImage.imageFilename.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '')
                  : `Photo ${i + 1} of ${total}`
              }
              className="w-full h-full object-cover"
              priority={i === 0}
            />
            {/* Bottom gradient */}
            <div
              className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div
        role="group"
        aria-label="Carousel controls"
        className="absolute bottom-4 430:bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2"
      >
        {photoGalleryImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1} of ${total}`}
            aria-current={i === current ? 'true' : undefined}
            className={`transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm ${
              i === current ? 'w-6 h-1.5 bg-blaze' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Showing slide {current + 1} of {total}
      </span>
    </section>
  )
}

export default MediaPhotoCarousel
