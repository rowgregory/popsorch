'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Gift, Star, Sparkles } from 'lucide-react'
import useSoundEffect from '@/app/hooks/useSoundEffect'

const ChristmasAnalyticsButton = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [presents, setPresents] = useState<{ id: number; x: number; rotation: number }[]>([])
  const [stars, setStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([])
  const { play } = useSoundEffect('/mp3/sleigh-bells.mp3', true)

  const handleClick = () => {
    setIsClicked(true)
    play()

    // Generate falling presents
    const newPresents = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      rotation: Math.random() * 360
    }))
    setPresents(newPresents)

    // Generate twinkling stars
    const newStars = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      delay: Math.random() * 0.3
    }))
    setStars(newStars)

    // Reset after animation
    setTimeout(() => {
      setIsClicked(false)
      setPresents([])
      setStars([])
      window.open('https://analytics.google.com', '_blank')
    }, 1500)
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl hover:shadow-green-500/50 transition-all duration-300 overflow-hidden"
      >
        {/* Christmas Light Flash */}
        {isClicked && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-400 via-green-400 to-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 0.6, times: [0, 0.5, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
          </>
        )}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

        {/* Glowing Border on Click */}
        {isClicked && (
          <motion.div
            className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-yellow-300"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/* Content */}
        <motion.div
          className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 w-full"
          animate={isClicked ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            animate={isClicked ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          <span>View Your Analytics Dashboard</span>
          <motion.div animate={isClicked ? { rotate: 360, scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.6 }}>
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform flex-shrink-0" />
          </motion.div>
        </motion.div>
      </button>

      {/* Falling Presents */}
      <AnimatePresence>
        {isClicked &&
          presents.map((present) => (
            <motion.div
              key={present.id}
              className="absolute top-0 pointer-events-none"
              style={{ left: `${present.x}%` }}
              initial={{ y: -20, opacity: 1, rotate: present.rotation }}
              animate={{
                y: 150,
                opacity: 0,
                rotate: present.rotation + 360
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: 'easeIn'
              }}
            >
              <Gift className="w-4 h-4 text-red-500 drop-shadow-lg" />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Twinkling Stars */}
      <AnimatePresence>
        {isClicked &&
          stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute top-1/2 left-1/2 pointer-events-none"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: star.x,
                y: star.y,
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                rotate: 360
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                delay: star.delay,
                ease: 'easeOut'
              }}
            >
              <Star className="w-3 h-3 fill-yellow-300 text-yellow-300 drop-shadow-glow" />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Sparkle Burst */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-12 h-12 text-yellow-300" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snow Burst */}
      <AnimatePresence>
        {isClicked &&
          Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full pointer-events-none shadow-glow"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1
              }}
              animate={{
                x: Math.cos((i / 12) * Math.PI * 2) * 80,
                y: Math.sin((i / 12) * Math.PI * 2) * 80,
                opacity: 0,
                scale: 0
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: i * 0.02
              }}
            />
          ))}
      </AnimatePresence>

      {/* Candy Cane Swirl */}
      <AnimatePresence>
        {isClicked && (
          <>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-red-500 border-dashed rounded-full pointer-events-none"
              initial={{ scale: 0.5, opacity: 1, rotate: 0 }}
              animate={{ scale: 2, opacity: 0, rotate: 180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-green-500 border-dashed rounded-full pointer-events-none"
              initial={{ scale: 0.5, opacity: 1, rotate: 0 }}
              animate={{ scale: 2.5, opacity: 0, rotate: -180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChristmasAnalyticsButton
