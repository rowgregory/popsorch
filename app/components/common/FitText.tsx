import { FC, useEffect, useRef, useState } from 'react'

const FitText: FC<{ text: string | number | undefined; maxFontSize?: number; minFontSize?: number }> = ({
  text,
  maxFontSize = 78,
  minFontSize = 10
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(maxFontSize)

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current
      const textEl = textRef.current
      if (!container || !textEl) return

      let currentSize = maxFontSize
      textEl.style.whiteSpace = 'nowrap'

      while (currentSize > minFontSize) {
        textEl.style.fontSize = `${currentSize}px`
        if (textEl.scrollWidth <= container.offsetWidth) break
        currentSize -= 1
      }

      setFontSize(currentSize)
    }

    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [text, maxFontSize, minFontSize])

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <span ref={textRef} style={{ fontSize, display: 'inline-block', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  )
}

export default FitText
