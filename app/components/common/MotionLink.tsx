import React, { forwardRef } from 'react'
import Link from 'next/link'
import { motion, MotionProps } from 'framer-motion'
import { LinkProps } from 'next/link'

// Combine Next.js Link props with Framer Motion props
type MotionLinkProps = Omit<LinkProps, 'href'> &
  MotionProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: React.ReactNode
    className?: string
    href: string
  }

// Create motion component for the Link
const MotionLinkComponent = forwardRef<HTMLAnchorElement, MotionLinkProps>(
  ({ href, children, className, as, replace, scroll, shallow, prefetch, locale, ...motionAndAnchorProps }, ref) => {
    // Link-specific props
    const linkProps: LinkProps = {
      href,
      as,
      replace,
      scroll,
      shallow,
      prefetch,
      locale
    }

    return (
      <Link {...linkProps} ref={ref} className={className} {...motionAndAnchorProps}>
        {children}
      </Link>
    )
  }
)

MotionLinkComponent.displayName = 'MotionLink'

const MotionLink = motion.create(MotionLinkComponent)

MotionLink.displayName = 'MotionLink'

export default MotionLink

// Common animation presets for convenience
export const motionLinkPresets = {
  hover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },

  lift: {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },

  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { opacity: 0.8 },
    transition: { duration: 0.2 }
  },

  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.3 }
  },

  button: {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
}

// Usage examples:
/*
// Basic usage
<MotionLink href="/about" whileHover={{ scale: 1.05 }}>
  About
</MotionLink>

// With preset animations
<MotionLink href="/contact" {...motionLinkPresets.lift}>
  Contact
</MotionLink>

// With custom animations
<MotionLink 
  href="/products"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.1, rotate: 2 }}
  transition={{ duration: 0.3 }}
  className="text-blue-500 hover:text-blue-700"
>
  Products
</MotionLink>

// With variants
const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  hover: { scale: 1.05, x: 5 }
}

<MotionLink 
  href="/services"
  variants={linkVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
>
  Services
</MotionLink>
*/
