'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { store, useAccessibilitySelector } from '@/app/redux/store'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import { ALargeSmall, BetweenVerticalStart, Contrast, LinkIcon, RefreshCcw, X } from 'lucide-react'
import { setAccessibilitySettings, setToggleAccessibilityDrawer } from '@/app/redux/features/accessibilitySlice'
import { usePathname } from 'next/navigation'

const textSteps = [1, 1.1, 1.2, 1.3, 1.4, 1.5] // 6 levels: normal + 5 size increases

interface StepIndicatorProps {
  currentStep: number // This will track the current step index
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${currentStep > index ? 'bg-blaze' : 'bg-midnightblack'}`}
        ></div>
      ))}
    </div>
  )
}

const AccessibilityDrawer = () => {
  const path = usePathname()
  const { accessibility } = useAccessibilitySelector()
  const [highContrast, setHighContrast] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('highContrast') === 'true' : false
  )
  const [highlightLinks, setHighlightLinks] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('highlightLinks') === 'true' : false
  )
  const [stepIndex, setStepIndex] = useState(() =>
    typeof window !== 'undefined' ? parseInt(localStorage.getItem('stepIndex') || '0') : 0
  )
  const [textSpacing, setTextSpacing] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('textSpacing') === 'true' : false
  )
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('dyslexiaFriendly') === 'true' : false
  )
  const [lineHeight, setLineHeight] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('lineHeight') === 'true' : false
  )

  // Use a ref to store the original font sizes of the elements
  const originalFontSizesRef = useRef<Map<HTMLElement, string>>(new Map())

  const isMounted = useRef(false)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      return
    }

    localStorage.setItem('highContrast', String(highContrast))
    localStorage.setItem('highlightLinks', String(highlightLinks))
    localStorage.setItem('stepIndex', String(stepIndex))
    localStorage.setItem('textSpacing', String(textSpacing))
    localStorage.setItem('dyslexiaFriendly', String(dyslexiaFriendly))
    localStorage.setItem('lineHeight', String(lineHeight))

    store.dispatch(
      setAccessibilitySettings({
        highContrast,
        highlightLinks,
        stepIndex,
        textSpacing,
        dyslexiaFriendly,
        lineHeight
      })
    )
  }, [highContrast, highlightLinks, stepIndex, textSpacing, dyslexiaFriendly, lineHeight])

  useEffect(() => {
    // Apply DOM changes on mount
    document.documentElement.setAttribute('data-high-contrast', String(highContrast))
    document.documentElement.classList.toggle('dyslexia-friendly', dyslexiaFriendly)

    if (highlightLinks) {
      document.querySelectorAll('a').forEach((link) => {
        link.style.color = '#ff0'
        link.style.textDecoration = 'underline'
        link.style.textDecorationThickness = '2px'
      })
    }

    if (textSpacing) {
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, p, label, li, span').forEach((el: any) => {
        el.style.letterSpacing = '0.1em'
      })
    }

    if (lineHeight) {
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span').forEach((el: any) => {
        el.style.lineHeight = '1.8'
      })
    }

    store.dispatch(
      setAccessibilitySettings({
        highContrast,
        highlightLinks,
        stepIndex,
        textSpacing,
        dyslexiaFriendly,
        lineHeight
      })
    )
  }, [dyslexiaFriendly, highContrast, highlightLinks, lineHeight, stepIndex, textSpacing])

  useEffect(() => {
    // Function to handle font size scaling
    const scaleFontSize = (element: HTMLElement, originalSize: string) => {
      const currentFontSize = originalSize
      const currentSize = parseFloat(currentFontSize)
      const newSize =
        stepIndex === textSteps.length + 1 - 1
          ? currentSize // Reset to the original size on the last step
          : currentSize * textSteps[stepIndex] // Scale based on the step

      element.style.fontSize = `${newSize}px`
    }

    // Get all accessibility items and main content
    const accessibilityItems = document.querySelectorAll('.accessibility-item')
    const mainContent = document.querySelector('.main-content')

    // For accessibility items, scale their font size
    accessibilityItems.forEach((element: any) => {
      if (!originalFontSizesRef.current.has(element)) {
        const originalSize = window.getComputedStyle(element).fontSize
        originalFontSizesRef.current.set(element, originalSize)
      }
      const originalSize: any = originalFontSizesRef.current.get(element)
      scaleFontSize(element, originalSize)
    })

    // For the main content, scale font size of child elements
    if (mainContent) {
      const textElements = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6, a, p, label, li, span')
      textElements.forEach((element: any) => {
        if (!originalFontSizesRef.current.has(element)) {
          const originalSize = window.getComputedStyle(element).fontSize
          originalFontSizesRef.current.set(element, originalSize) // Store original size in ref
        }
        const originalSize: any = originalFontSizesRef.current.get(element)
        scaleFontSize(element, originalSize)
      })
    }
  }, [stepIndex, path])

  const cycleTextSize = () => {
    setStepIndex((prevIndex) => {
      // If we reach the last step (1.4), reset on the next click (to step 0)
      return prevIndex === textSteps.length - 1 ? 0 : prevIndex + 1
    })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-high-contrast', String(highContrast))
  }, [highContrast, path])

  useEffect(() => {
    const links = document.querySelectorAll('a')
    links.forEach((link) => {
      if (highlightLinks) {
        link.style.color = '#ff0'
        link.style.textDecoration = 'underline'
        link.style.textDecorationThickness = '2px'
      } else {
        link.style.color = ''
        link.style.textDecoration = ''
        link.style.textDecorationThickness = ''
      }
    })
  }, [highlightLinks, path])

  useEffect(() => {
    // Select all text elements that should have spacing adjusted
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, a, p, label, li, span')

    // Loop through all elements and adjust text spacing
    textElements.forEach((element: any) => {
      if (textSpacing) {
        // Apply increased text spacing
        element.style.letterSpacing = '0.1em' // Example spacing value
      } else {
        // Reset to normal letter spacing
        element.style.letterSpacing = ''
      }
    })
  }, [textSpacing])

  useEffect(() => {
    if (dyslexiaFriendly) {
      document.body.classList.add('dyslexia-friendly')
    } else {
      document.body.classList.remove('dyslexia-friendly')
    }
  }, [dyslexiaFriendly])

  useEffect(() => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span')

    textElements.forEach((element: any) => {
      if (lineHeight) {
        element.style.lineHeight = '1.8'
      } else {
        element.style.lineHeight = ''
      }
    })
  }, [lineHeight])

  const reset = () => {
    setHighContrast(false)
    setHighlightLinks(false)
    setStepIndex(0)
    setTextSpacing(false)
    setDyslexiaFriendly(false)
    setLineHeight(false)

    // DOM cleanup
    document.documentElement.setAttribute('data-high-contrast', 'false')
    document.documentElement.classList.remove('dyslexia-friendly')

    // Reset inline styles
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, div, a, label')
    textElements.forEach((element: any) => {
      element.style.fontFamily = ''
      element.style.lineHeight = ''
      element.style.backgroundColor = ''
      element.style.color = ''
      element.style.letterSpacing = ''
      element.style.textDecoration = ''
      element.style.textDecorationThickness = ''
    })

    // Clear localStorage
    localStorage.setItem('highContrast', 'false')
    localStorage.setItem('highlightLinks', 'false')
    localStorage.setItem('stepIndex', '0')
    localStorage.setItem('textSpacing', 'false')
    localStorage.setItem('dyslexiaFriendly', 'false')
    localStorage.setItem('lineHeight', 'false')
  }

  return (
    <AnimatePresence>
      {accessibility && (
        <>
          <motion.div
            variants={backdropVariants}
            onClick={() => store.dispatch(setToggleAccessibilityDrawer(accessibility))}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          <motion.div
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-drawer-heading"
            className="h-dvh w-full 760:w-2/3 990:w-1/2 fixed top-0 right-0 z-100 bg-black border-l border-white/10 border-t-2 border-t-blaze flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 430:px-8 py-5 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                <h2
                  id="accessibility-drawer-heading"
                  className="font-changa text-xs uppercase tracking-[0.25em] text-blaze"
                >
                  Accessibility Options
                </h2>
              </div>
              <button
                type="button"
                onClick={() => store.dispatch(setToggleAccessibilityDrawer(true))}
                aria-label="Close accessibility options"
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <p className="px-5 430:px-8 py-4 font-lato text-xs text-white/40 border-b border-white/10 shrink-0">
              Customize your viewing experience for better accessibility
            </p>

            {/* Options */}
            <div className="flex-1 overflow-y-auto px-5 430:px-8 py-6 430:py-8">
              <ul
                role="list"
                aria-label="Accessibility settings"
                className="grid grid-cols-1 430:grid-cols-2 gap-px bg-white/10"
              >
                {/* Text Size */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={cycleTextSize}
                    aria-label={`Text size: cycle through options`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className="w-12 h-12 border border-white/10 group-hover:border-blaze/30 flex items-center justify-center transition-colors"
                      aria-hidden="true"
                    >
                      <div className="flex items-end gap-0.5">
                        <span className="text-xs text-white/50">T</span>
                        <span className="text-base text-white">T</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">Text Size</p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Adjust for readability</p>
                      <StepIndicator currentStep={stepIndex} />
                    </div>
                  </button>
                </li>

                {/* High Contrast */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={() => setHighContrast(!highContrast)}
                    aria-pressed={highContrast}
                    aria-label={`High contrast: ${highContrast ? 'on' : 'off'}`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        highContrast ? 'border-blaze/50 bg-blaze/10' : 'border-white/10 group-hover:border-blaze/30'
                      }`}
                      aria-hidden="true"
                    >
                      <Contrast className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">High Contrast</p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Enhanced visual contrast</p>
                      <div
                        className={`w-2 h-2 rounded-full mx-auto transition-colors ${highContrast ? 'bg-blaze' : 'bg-white/20'}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>

                {/* Highlight Links */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={() => setHighlightLinks(!highlightLinks)}
                    aria-pressed={highlightLinks}
                    aria-label={`Highlight links: ${highlightLinks ? 'on' : 'off'}`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        highlightLinks ? 'border-blaze/50 bg-blaze/10' : 'border-white/10 group-hover:border-blaze/30'
                      }`}
                      aria-hidden="true"
                    >
                      <LinkIcon className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">Highlight Links</p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Make links more visible</p>
                      <div
                        className={`w-2 h-2 rounded-full mx-auto transition-colors ${highlightLinks ? 'bg-blaze' : 'bg-white/20'}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>

                {/* Text Spacing */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={() => setTextSpacing(!textSpacing)}
                    aria-pressed={textSpacing}
                    aria-label={`Text spacing: ${textSpacing ? 'on' : 'off'}`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        textSpacing ? 'border-blaze/50 bg-blaze/10' : 'border-white/10 group-hover:border-blaze/30'
                      }`}
                      aria-hidden="true"
                    >
                      <BetweenVerticalStart className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">Text Spacing</p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Increase letter spacing</p>
                      <div
                        className={`w-2 h-2 rounded-full mx-auto transition-colors ${textSpacing ? 'bg-blaze' : 'bg-white/20'}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>

                {/* Dyslexia-Friendly */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={() => setDyslexiaFriendly(!dyslexiaFriendly)}
                    aria-pressed={dyslexiaFriendly}
                    aria-label={`Dyslexia-friendly font: ${dyslexiaFriendly ? 'on' : 'off'}`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        dyslexiaFriendly ? 'border-blaze/50 bg-blaze/10' : 'border-white/10 group-hover:border-blaze/30'
                      }`}
                      aria-hidden="true"
                    >
                      <span className="font-bold text-white/60 text-base">Aa</span>
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">
                        Dyslexia-Friendly
                      </p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Easier-to-read font</p>
                      <div
                        className={`w-2 h-2 rounded-full mx-auto transition-colors ${dyslexiaFriendly ? 'bg-blaze' : 'bg-white/20'}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>

                {/* Line Height */}
                <li className="bg-black">
                  <button
                    type="button"
                    onClick={() => setLineHeight(!lineHeight)}
                    aria-pressed={lineHeight}
                    aria-label={`Line height: ${lineHeight ? 'on' : 'off'}`}
                    className="group w-full p-5 430:p-6 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset"
                  >
                    <div
                      className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                        lineHeight ? 'border-blaze/50 bg-blaze/10' : 'border-white/10 group-hover:border-blaze/30'
                      }`}
                      aria-hidden="true"
                    >
                      <ALargeSmall className="w-5 h-5 text-white/60" />
                    </div>
                    <div className="text-center">
                      <p className="font-changa text-xs uppercase tracking-[0.2em] text-white mb-1">Line Height</p>
                      <p className="font-lato text-[10px] text-white/40 mb-3">Increase line spacing</p>
                      <div
                        className={`w-2 h-2 rounded-full mx-auto transition-colors ${lineHeight ? 'bg-blaze' : 'bg-white/20'}`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Footer — reset */}
            <div className="px-5 430:px-8 py-5 border-t border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => reset()}
                className="group w-full inline-flex items-center justify-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa text-xs uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
              >
                <RefreshCcw
                  className="w-4 h-4 shrink-0 group-hover:rotate-180 transition-transform duration-500"
                  aria-hidden="true"
                />
                <span>Reset All Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AccessibilityDrawer
