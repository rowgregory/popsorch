import { useEffect, useRef, useState } from 'react'

export const useHeaderAtTop = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [hasHitTop, setHasHitTop] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const { top } = header.getBoundingClientRect()

      // Add a small threshold to avoid flickering
      const buffer = 5
      const isNowHitTop = top <= buffer

      // Only update if it actually changes
      setHasHitTop((prev) => {
        if (prev !== isNowHitTop) return isNowHitTop
        return prev
      })
    }

    // Run once on mount in case the user is already scrolled
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { hasHitTop, headerRef }
}
