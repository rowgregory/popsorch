import React from 'react'
import { motion } from 'framer-motion'

interface CustomHeaderButtonProps {
  animation: string
  backgroundColor: string
  createdAt: Date
  fontColor: string
  id: string
  link: string
  linkType: string
  text: string
}

const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = ({
  animation,
  backgroundColor,
  fontColor,
  link,
  linkType,
  text
}) => {
  // All available animations
  const animations = [
    {
      id: 'scale',
      name: 'Scale',
      description: 'Smooth scaling effect',
      icon: '📏',
      variants: {
        initial: { scale: 1 },
        hover: { scale: 1.05 }
      }
    },
    {
      id: 'slide',
      name: 'Slide',
      description: 'Slide animation with shadow',
      icon: '🎯',
      variants: {
        initial: { x: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        hover: { x: 4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }
      }
    },
    {
      id: 'bounce',
      name: 'Bounce',
      description: 'Playful bounce effect',
      icon: '🏀',
      variants: {
        initial: { y: 0 },
        hover: { y: -8 }
      }
    },
    {
      id: 'glow',
      name: 'Glow',
      description: 'Glowing border effect',
      icon: '✨',
      variants: {
        initial: { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' },
        hover: { boxShadow: '0 0 20px 5px rgba(59, 130, 246, 0.3)' }
      }
    },
    {
      id: 'rotate',
      name: 'Rotate',
      description: 'Subtle rotation effect',
      icon: '🔄',
      variants: {
        initial: { rotate: 0 },
        hover: { rotate: 2 }
      }
    }
  ]

  // Animation variants based on animation type
  const getAnimationVariants = () => {
    const selectedAnimation = animations.find((anim) => anim.id === animation)

    if (selectedAnimation) {
      return {
        ...selectedAnimation.variants,
        tap: { scale: 0.95 } // Add tap animation for all types
      }
    }

    // Default fallback
    return {
      initial: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    }
  }

  const variants = getAnimationVariants()

  // Handle click based on link type
  const handleClick = () => {
    if (linkType === 'external') {
      window.open(link, '_blank', 'noopener,noreferrer')
    } else if (linkType === 'phone') {
      window.location.href = `tel:${link}`
    } else {
      // For internal links, you might want to use your router
      window.location.href = link
    }
  }

  return (
    <motion.button
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      className="font-changa font-bold px-8 py-4 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-60 uppercase tracking-wider relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-white/20"
      style={
        {
          backgroundColor,
          color: fontColor,
          '--tw-ring-color': backgroundColor + '80',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
          backdropFilter: 'blur(10px)'
        } as React.CSSProperties
      }
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0"
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 3
        }}
      />

      {/* Pulsing dot effect */}
      <motion.div
        className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity
        }}
      />

      {/* Button text with exciting styling */}
      <span className="relative z-10 drop-shadow-lg">{text}</span>
    </motion.button>
  )
}

export default CustomHeaderButton
