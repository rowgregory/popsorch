'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Music } from 'lucide-react'
import Link from 'next/link'

const Pops404 = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const buttonHover: any = {
    scale: 1.02,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Musical Icon */}
        <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
          <div className="w-20 h-20 bg-gradient-to-br from-blaze to-sunburst rounded-full flex items-center justify-center">
            <Music className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-8xl md:text-9xl font-light text-gray-800 dark:text-white tracking-tight">404</h1>
        </motion.div>

        {/* Main heading */}
        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            This Page Has Left the Stage
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to the
            performance.
          </p>
        </motion.div>

        {/* Primary actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="flex items-center gap-3 bg-gradient-to-r from-blaze to-sunburst text-white px-8 py-3 rounded-lg font-medium hover:from-sunburst hover:to-blaze transition-all min-w-[180px] justify-center shadow-lg"
            >
              <Home size={18} />
              Return to Home
            </Link>
          </motion.div>

          <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
            <Link
              href="/concerts"
              className="flex items-center gap-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all min-w-[180px] justify-center"
            >
              <Music size={18} />
              View Concerts
            </Link>
          </motion.div>
        </motion.div>

        {/* Back navigation */}
        <motion.div variants={itemVariants}>
          <motion.button
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors font-medium"
            whileHover={{ x: -3 }}
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Branding */}
        <motion.div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700" variants={itemVariants}>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 The Pops Orchestra of Sarasota and Bradenton
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Pops404
