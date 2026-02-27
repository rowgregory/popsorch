import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { sendEnrichedGAEvent } from '../utils/sendEnrichedGAEvent'

interface DropdownItem {
  id: string
  text: string
  linkType: string
  link: string
  icon?: string
}

interface CustomHeaderButtonProps {
  animation: string
  backgroundColor: string
  createdAt: Date
  fontColor: string
  id: string
  link: string
  linkType: string
  text: string
  type: string
  dropdownItems?: DropdownItem[]
}

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

const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = ({
  animation,
  backgroundColor,
  fontColor,
  link,
  linkType,
  text,
  type,
  dropdownItems = []
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { push } = useRouter()
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleGAEvent = (item?: DropdownItem) => {
    const isDropdownItem = !!item

    sendEnrichedGAEvent(
      isDropdownItem ? 'click_dropdown_item' : 'click_header_button',
      isDropdownItem ? item.link : link,
      isDropdownItem ? item.text : text,
      'header'
    )
  }

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

  // Handle click based on button type and link type
  const handleClick = () => {
    if (type === 'dropdown') {
      setIsDropdownOpen(!isDropdownOpen)
      return
    }

    if (linkType === 'external') {
      window.open(link, '_blank', 'noopener,noreferrer')
    } else if (linkType === 'phone') {
      window.location.href = `tel:${link}`
    } else {
      // For internal links, you might want to use your router
      push(link)
    }
  }

  const handleDropdownItemClick = useCallback(
    (item: DropdownItem) => {
      if (item.linkType === 'external') {
        window.open(item.link, '_blank', 'noopener,noreferrer')
      } else if (item.linkType === 'phone') {
        window.location.href = `tel:${item.link}`
      } else {
        push(item.link)
      }
      setIsDropdownOpen(false)
    },
    [push]
  )

  return (
    <>
      {/* Background blur overlay when dropdown is open */}
      <AnimatePresence>
        {isDropdownOpen && type === 'dropdown' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsDropdownOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="relative" ref={dropdownRef}>
        <motion.button
          type="button"
          variants={variants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleClick}
          className="font-changa font-bold px-5 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-60 uppercase tracking-wider relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-white/20 flex items-center gap-2 flex-1"
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
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-label={text}
        >
          {/* Animated background overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 opacity-0"
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

          <span className="relative z-10 drop-shadow-lg">{text}</span>

          {/* Dropdown chevron */}
          {type === 'dropdown' && (
            <motion.div
              className="relative z-10"
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            </motion.div>
          )}
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isDropdownOpen && type === 'dropdown' && dropdownItems.length > 0 && (
            <motion.div
              role="menu"
              aria-label={`${text} dropdown menu`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-2 min-w-60 bg-inkblack backdrop-blur-lg rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {dropdownItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  role="menuitem"
                  onClick={() => {
                    handleGAEvent(item)
                    handleDropdownItemClick(item)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:text-blaze transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span className="text-sm">{item.icon}</span>}
                    <span className="font-medium whitespace-nowrap">{item.text}</span>
                    {item.linkType === 'external' && (
                      <svg
                        className="w-3 h-3 text-gray-400 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default CustomHeaderButton
