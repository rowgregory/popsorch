import { useEffect, useState } from 'react'

interface CarouselItem {
  imageUrl: string
  [key: string]: any
}

export const useImageCarousel = (items: CarouselItem[]) => {
  const [visibleCount, setVisibleCount] = useState(4)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 760 ? 1 : 6)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(items.length - visibleCount, 0)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const visibleItems = items.slice(currentIndex, currentIndex + visibleCount)

  return { visibleItems, next, prev, currentIndex, maxIndex }
}
