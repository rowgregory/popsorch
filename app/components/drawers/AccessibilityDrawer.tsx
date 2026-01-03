'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAccessibilitySelector, useAppDispatch } from '@/app/redux/store'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { backdropVariants, drawerVariants } from '@/app/lib/constants/motion'
import { ALargeSmall, BetweenVerticalStart, Contrast, Link, RefreshCcw, X } from 'lucide-react'
import { setAccessibilitySettings, setToggleAccessibilityDrawer } from '@/app/redux/features/accessibilitySlice'

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
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { accessibility } = useAccessibilitySelector()
  const [highContrast, setHighContrast] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [textSpacing, setTextSpacing] = useState(false)
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(false)
  const [lineHeight, setLineHeight] = useState(false)

  // Use a ref to store the original font sizes of the elements
  const originalFontSizesRef = useRef<Map<HTMLElement, string>>(new Map())

  // Load from localStorage on mount and initialize both local state AND Redux
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true'
    const savedHighlightLinks = localStorage.getItem('highlightLinks') === 'true'
    const savedStepIndex = parseInt(localStorage.getItem('stepIndex') || '0')
    const savedTextSpacing = localStorage.getItem('textSpacing') === 'true' // Fix: was 'stepIndex'
    const savedDyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    const savedLineHeight = localStorage.getItem('lineHeight') === 'true'

    // Set local state
    setHighContrast(savedHighContrast)
    setHighlightLinks(savedHighlightLinks)
    setStepIndex(savedStepIndex)
    setTextSpacing(savedTextSpacing)
    setDyslexiaFriendly(savedDyslexiaFriendly)
    setLineHeight(savedLineHeight)

    // Set Redux state
    dispatch(
      setAccessibilitySettings({
        highContrast: savedHighContrast,
        highlightLinks: savedHighlightLinks,
        stepIndex: savedStepIndex,
        textSpacing: savedTextSpacing,
        dyslexiaFriendly: savedDyslexiaFriendly,
        lineHeight: savedLineHeight
      })
    )
  }, [dispatch]) // Only run on mount

  // Sync changes to both localStorage AND Redux when local state changes
  useEffect(() => {
    localStorage.setItem('highContrast', String(highContrast))
    localStorage.setItem('highlightLinks', String(highlightLinks))
    localStorage.setItem('stepIndex', String(stepIndex))
    localStorage.setItem('textSpacing', String(textSpacing))
    localStorage.setItem('dyslexiaFriendly', String(dyslexiaFriendly))
    localStorage.setItem('lineHeight', String(lineHeight))

    dispatch(
      setAccessibilitySettings({
        highContrast,
        highlightLinks,
        stepIndex,
        textSpacing,
        dyslexiaFriendly,
        lineHeight
      })
    )
  }, [dispatch, dyslexiaFriendly, highContrast, highlightLinks, lineHeight, stepIndex, textSpacing])

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
    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [highContrast, path])

  useEffect(() => {
    const links = document.querySelectorAll('a')
    links.forEach((link) => {
      if (highlightLinks) {
        link.style.backgroundColor = 'yellow'
        link.style.color = 'black'
      } else {
        link.style.backgroundColor = ''
        link.style.color = ''
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

    // Also optionally clear body classes if you use them
    document.body.classList.remove('high-contrast', 'line-height-expanded', 'dyslexia-friendly')

    // If you're also applying inline styles manually (like fontFamily, lineHeight), you could clear them too
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, span, div, a, label')
    textElements.forEach((element: any) => {
      element.style.fontFamily = ''
      element.style.lineHeight = ''
      element.style.backgroundColor = ''
      element.style.color = ''
      element.style.letterSpacing = ''
    })

    localStorage.setItem('highContrast', String(false))
    localStorage.setItem('highlightLinks', String(false))
    localStorage.setItem('stepIndex', String(0))
    localStorage.setItem('textSpacing', String(false))
    localStorage.setItem('dyslexiaFriendly', String(false))
    localStorage.setItem('lineHeight', String(false))
  }

  return (
    <AnimatePresence>
      {accessibility && (
        <>
          <motion.div
            variants={backdropVariants}
            onClick={() => dispatch(setToggleAccessibilityDrawer(accessibility))}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          <motion.div
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: 'tween',
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="h-dvh w-full xl:w-1/2 fixed top-0 right-0 z-[100] bg-neutral-950 shadow-[-10px_0_30px_-5px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-6 relative">
              <X
                className="text-white w-5 h-5 absolute top-2 right-2 z-50"
                onClick={() => dispatch(setToggleAccessibilityDrawer(true))}
              />
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-changa font-bold text-neutral-100 mb-2">Accessibility Options</h2>
                  <p className="text-neutral-400 text-sm">Customize your viewing experience for better accessibility</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Text Size */}
                  <div
                    onClick={cycleTextSize}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-neutral-300">T</span>
                          <span className="text-xl font-medium text-neutral-100">T</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">Text Size</h3>
                        <p className="text-neutral-400 text-xs mb-3">Adjust text size for readability</p>
                        <StepIndicator currentStep={stepIndex} />
                      </div>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div
                    onClick={() => setHighContrast(!highContrast)}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <Contrast className="w-8 h-8 text-neutral-300" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">High Contrast</h3>
                        <p className="text-neutral-400 text-xs mb-3">Enhanced visual contrast</p>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            highContrast ? 'bg-blaze shadow-lg shadow-blaze/50' : 'bg-neutral-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Highlight Links */}
                  <div
                    onClick={() => setHighlightLinks(!highlightLinks)}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <Link className="w-8 h-8 text-neutral-300" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">Highlight Links</h3>
                        <p className="text-neutral-400 text-xs mb-3">Make links more visible</p>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            highlightLinks ? 'bg-blaze shadow-lg shadow-blaze/50' : 'bg-neutral-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Text Spacing */}
                  <div
                    onClick={() => setTextSpacing(!textSpacing)}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <BetweenVerticalStart className="w-8 h-8 text-neutral-300" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">Text Spacing</h3>
                        <p className="text-neutral-400 text-xs mb-3">Increase letter spacing</p>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            textSpacing ? 'bg-blaze shadow-lg shadow-blaze/50' : 'bg-neutral-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Dyslexia-Friendly */}
                  <div
                    onClick={() => setDyslexiaFriendly(!dyslexiaFriendly)}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <span className="text-xl font-bold text-neutral-300">Aa</span>
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">Dyslexia-Friendly</h3>
                        <p className="text-neutral-400 text-xs mb-3">Easier-to-read font</p>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            dyslexiaFriendly ? 'bg-blaze shadow-lg shadow-blaze/50' : 'bg-neutral-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Line Height */}
                  <div
                    onClick={() => setLineHeight(!lineHeight)}
                    className="group relative bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-xl border border-neutral-700/50 hover:border-neutral-600/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-neutral-700/50 rounded-full group-hover:bg-neutral-600/50 transition-colors">
                        <ALargeSmall className="w-8 h-8 text-neutral-300" />
                      </div>

                      <div className="text-center">
                        <h3 className="text-neutral-100 font-semibold mb-1">Line Height</h3>
                        <p className="text-neutral-400 text-xs mb-3">Increase line spacing</p>
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            lineHeight ? 'bg-blaze shadow-lg shadow-blaze/50' : 'bg-neutral-600'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => reset()}
                    className="group flex items-center gap-3 bg-gradient-to-r from-blaze to-blazehover hover:from-blazehover hover:to-blaze px-8 py-4 rounded-xl font-changa uppercase text-sm font-bold tracking-wider text-white transition-all duration-300 hover:shadow-xl hover:shadow-blaze/25 hover:-translate-y-0.5"
                  >
                    <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Reset All Settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AccessibilityDrawer
