import { useState, useEffect } from 'react'

interface Item {
  image: string
  title: string
  text: string
}

export function useRotatingImageText(items: Item[], interval = 8000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), interval - 1000) // Start fading out 1s before switch
    const switchTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
      setFade(true)
    }, interval)

    return () => {
      clearTimeout(fadeTimeout)
      clearTimeout(switchTimeout)
    }
  }, [currentIndex, items.length, interval])

  const currentItem = items[currentIndex]

  return {
    currentItem,
    fade
  }
}
