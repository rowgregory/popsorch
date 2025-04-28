'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setToggleAccessibilityDrawer } from '../redux/features/appSlice'
import LeftDrawer from '../components/common/LeftDrawer'
import useCustomPathname from '../hooks/useCustomPathname'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { circleHaltStrokeIcon, linkIcon, refreshIcon, textHeightIcon, textWidthIcon } from '../lib/icons'

const textSteps = [1, 1.1, 1.2, 1.3, 1.4] // 5 levels: normal → bigger → biggest

interface StepIndicatorProps {
  currentStep: number // This will track the current step index
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${currentStep >= index ? 'bg-blaze' : 'bg-midnightblack'}`}
        ></div>
      ))}
    </div>
  )
}

const AccessibilityDrawer = () => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { accessibility } = useAppSelector((state: RootState) => state.app)
  const [highContrast, setHighContrast] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [textSpacing, setTextSpacing] = useState(false)
  const [dyslexiaFriendly, setDyslexiaFriendly] = useState(false)
  const [lineHeight, setLineHeight] = useState(false)

  // Use a ref to store the original font sizes of the elements
  const originalFontSizesRef = useRef<Map<HTMLElement, string>>(new Map())

  // Load settings from localStorage when the component mounts
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast') === 'true'
    const savedHighlightLinks = localStorage.getItem('highlightLinks') === 'true'
    const savedStepIndex = parseInt(localStorage.getItem('stepIndex') || '0')
    const savedTextSpacing = localStorage.getItem('stepIndex') === 'true'
    const savedDyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    const savedLineHeight = localStorage.getItem('lineHeight') === 'true'

    setHighContrast(savedHighContrast)
    setHighlightLinks(savedHighlightLinks)
    setStepIndex(savedStepIndex)
    setTextSpacing(savedTextSpacing)
    setDyslexiaFriendly(savedDyslexiaFriendly)
    setLineHeight(savedLineHeight)
  }, [path])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('highContrast', String(highContrast))
    localStorage.setItem('highlightLinks', String(highlightLinks))
    localStorage.setItem('stepIndex', String(stepIndex))
    localStorage.setItem('textSpacing', String(textSpacing))
    localStorage.setItem('dyslexiaFriendly', String(dyslexiaFriendly))
    localStorage.setItem('lineHeight', String(lineHeight))
  }, [highContrast, highlightLinks, stepIndex, textSpacing, dyslexiaFriendly, lineHeight])

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
    <LeftDrawer isOpen={accessibility} onClose={() => dispatch(setToggleAccessibilityDrawer(true))}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 p-4">
        <div className="text-xl text-center mb-3 font-changa">Accessibility Options</div>

        <div className="grid grid-cols-12 gap-2 w-full items-center">
          <div
            onClick={cycleTextSize}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <div className="accessibility-item text-lg">T</div>
              <div className="accessibility-item text-3xl">T</div>
            </div>
            <div className="flex flex-col">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">Bigger Text</div>
              <StepIndicator currentStep={stepIndex} />
            </div>
          </div>

          <div
            onClick={() => setHighContrast(!highContrast)}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <AwesomeIcon icon={circleHaltStrokeIcon} className="w-8 h-8" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">High Contast</div>
              <div className={`w-3 h-3 rounded-full mt-4 ${highContrast ? 'bg-blaze' : 'bg-midnightblack'}`}></div>
            </div>
          </div>

          <div
            onClick={() => setHighlightLinks(!highlightLinks)}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <AwesomeIcon icon={linkIcon} className="w-8 h-8" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">
                Hightlight Links
              </div>
              <div className={`w-3 h-3 rounded-full mt-4 ${highlightLinks ? 'bg-blaze' : 'bg-midnightblack'}`}></div>
            </div>
          </div>

          <div
            onClick={() => setTextSpacing(!textSpacing)}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <AwesomeIcon icon={textWidthIcon} className="w-8 h-8" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">Text Spacing</div>
              <div className={`w-3 h-3 rounded-full mt-4 ${textSpacing ? 'bg-blaze' : 'bg-midnightblack'}`}></div>
            </div>
          </div>

          <div
            onClick={() => setDyslexiaFriendly(!dyslexiaFriendly)}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <div className="text-2xol font-bold">Pqbd</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">
                Dyslexia-Friendly Text
              </div>
              <div className={`w-3 h-3 rounded-full mt-4 ${dyslexiaFriendly ? 'bg-blaze' : 'bg-midnightblack'}`}></div>
            </div>
          </div>

          <div
            onClick={() => setLineHeight(!lineHeight)}
            className="col-span-12 990:col-span-6 relative h-full w-full bg-duskgray p-4 rounded-sm flex items-end justify-center aspect-square cursor-pointer duration-300 hover:bg-[#333]"
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] mx-auto flex items-center gap-x-1">
              <AwesomeIcon icon={textHeightIcon} className="w-8 h-8" />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center text-sm text-white font-lato font-semibold tracking-wider">Line Height</div>
              <div className={`w-3 h-3 rounded-full mt-4 ${lineHeight ? 'bg-blaze' : 'bg-midnightblack'}`}></div>
            </div>
          </div>

          <div
            onClick={() => reset()}
            className="col-span-12 bg-blaze hover:bg-blazehover duration-300 whitespace-nowrap font-changa uppercase text-sm mt-12 px-8 py-2 rounded-sm flex items-center gap-x-3"
          >
            <AwesomeIcon icon={refreshIcon} className="w-4 h-4" />
            Reset All Accessibility Settings
          </div>
        </div>
      </motion.div>
    </LeftDrawer>
  )
}

export default AccessibilityDrawer
