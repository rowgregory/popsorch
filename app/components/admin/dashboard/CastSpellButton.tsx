'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import { useUserSelector } from '@/app/redux/store'

const CastSpellButton = () => {
  const [isCasting, setIsCasting] = useState(false)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])
  const { push } = useRouter()
  const { user } = useUserSelector()
  const { play } = useSoundEffect('/mp3/magical-reveal.mp3', user.isSoundEffectsOn)

  const handleClick = () => {
    setIsCasting(true)
    play()
    // Generate magical particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100
    }))
    setParticles(newParticles)

    // Reset after animation
    setTimeout(() => {
      setIsCasting(false)
      setParticles([])
      push('/admin/apothecary/codex')
    }, 1000)
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="relative w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all overflow-hidden group"
      >
        {/* Magic Ripple Effect */}
        {isCasting && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-lg"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-lg"
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            />
          </>
        )}

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex items-center gap-2"
          animate={isCasting ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.div animate={isCasting ? { rotate: 360 } : {}} transition={{ duration: 0.6 }}>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span>Cast Spell</span>
          <motion.div animate={isCasting ? { rotate: -360 } : {}} transition={{ duration: 0.6 }}>
            <Zap className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </button>

      {/* Magical Particles */}
      <AnimatePresence>
        {isCasting &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute top-1/2 left-1/2 w-2 h-2 pointer-events-none"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 1
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: 'easeOut'
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400 shadow-lg shadow-indigo-500/50" />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Magic Circle */}
      <AnimatePresence>
        {isCasting && (
          <>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-indigo-400 rounded-full pointer-events-none"
              initial={{ scale: 0, opacity: 1, rotate: 0 }}
              animate={{ scale: 2, opacity: 0, rotate: 180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-violet-400 rounded-full pointer-events-none"
              initial={{ scale: 0, opacity: 1, rotate: 0 }}
              animate={{ scale: 2.5, opacity: 0, rotate: -180 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CastSpellButton
