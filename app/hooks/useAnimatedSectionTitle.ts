'use client'

import { useEffect, useState, useRef } from 'react'

const useAnimatedSectionTitle = (threshold: number) => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold })

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default useAnimatedSectionTitle
