'use client'

import { AnimationGeneratorType, motion } from 'framer-motion'
import { Home, ArrowLeft, Music } from 'lucide-react'
import Link from 'next/link'

const Pops404 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, easeing: 'easeOut' }
    }
  }

  const buttonHover = {
    scale: 1.02,
    transition: { type: 'spring' as AnimationGeneratorType, stiffness: 400, damping: 10 }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Musical Icon */}
        <motion.div className="mb-6 flex justify-center" variants={itemVariants}>
          <div className="w-20 h-20 bg-linear-to-br from-blaze to-sunburst rounded-full flex items-center justify-center shadow-lg shadow-blaze/20">
            <Music className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* 404 Number */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-8xl md:text-9xl font-light text-white tracking-tight">404</h1>
        </motion.div>

        {/* Main heading */}
        <motion.div className="mb-6" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">This Page Has Left the Stage</h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto">
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
              className="flex items-center gap-3 bg-linear-to-r from-blaze to-sunburst hover:from-sunburst hover:to-blaze text-white px-8 py-3 rounded-lg font-medium transition-all min-w-45 justify-center shadow-lg shadow-blaze/20"
            >
              <Home size={18} />
              Return to Home
            </Link>
          </motion.div>

          <motion.div whileHover={buttonHover} whileTap={{ scale: 0.98 }}>
            <Link
              href="/concerts"
              className="flex items-center gap-3 bg-neutral-900 text-neutral-200 border border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 px-8 py-3 rounded-lg font-medium transition-all min-w-45 justify-center"
            >
              <Music size={18} />
              View Concerts
            </Link>
          </motion.div>
        </motion.div>

        {/* Back navigation */}
        <motion.div variants={itemVariants}>
          <motion.button
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-200 transition-colors font-medium"
            whileHover={{ x: -3 }}
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </motion.button>
        </motion.div>

        {/* Branding */}
        <motion.div className="mt-12 pt-6 border-t border-neutral-800" variants={itemVariants}>
          <p className="text-sm text-neutral-600">© 2025 The Pops Orchestra of Sarasota and Bradenton</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Pops404
