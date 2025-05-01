import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const [textArray, setTextArray] = useState<string[]>([])

  // Split text into an array of characters for individual animation
  useEffect(() => {
    // Split by word but include the space with each word
    const words = text.split(/(\s+)/) // Captures spaces too
    setTextArray(words)
  }, [text])

  return (
    <div className="flex flex-wrap">
      {textArray.map((char, index) => (
        <Character key={index} index={index} char={char} />
      ))}
    </div>
  )
}

interface CharacterProps {
  char: string
  index: number
}

const Character: React.FC<CharacterProps> = ({ char, index }) => {
  const [scrollY, setScrollY] = useState(0)

  // Scroll event listener to track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll factor
      const newScrollY = window.scrollY
      setScrollY(newScrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Normalize scroll position to control the opacity (brightness)
  const scrollFactor = Math.min(scrollY / 1000, 1) // Max scrollFactor at 1

  // Calculate opacity based on scrollY, clamp it to ensure it stays within range
  const currentOpacity = Math.max(0.7 + scrollFactor * 0.3, 0.7) // Opacity ranges from 0.7 to 1

  // Delay each character animation slightly based on its index
  const delay = index * 0.05 // Delay for each character

  return (
    <motion.span
      initial={{ filter: 'brightness(0.7)' }} // Initial brightness (darker)
      animate={{ filter: `brightness(${currentOpacity})` }} // Adjust brightness on scroll
      transition={{ duration: 0.3, delay }} // Use delay to stagger character animations
      className="inline-block"
    >
      {char === ' ' ? '\u00A0' : char} {/* Handle spaces as invisible character */}
    </motion.span>
  )
}
