import { useState, useEffect } from 'react'

export const useRotatingText = (texts: string[], interval = 4000) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), interval - 1000) // Start fading out 1s before switch
    const switchTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
      setFade(true)
    }, interval)

    return () => {
      clearTimeout(fadeTimeout)
      clearTimeout(switchTimeout)
    }
  }, [currentIndex, texts.length, interval])

  return { text: texts[currentIndex], fade }
}
