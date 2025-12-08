'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ConductorWithEffect = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-48 h-64 z-30 pointer-events-none">
      {/* Orbital Ring System */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-40 h-40">
        {/* Sparkle Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${50 + 35 * Math.cos((i / 12) * Math.PI * 2)}%`,
              top: `${50 + 35 * Math.sin((i / 12) * Math.PI * 2)}%`,
              transform: 'translate(-50%, -50%)',
              background: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#6366f1' : '#4f46e5',
              boxShadow: `0 0 12px 4px ${
                i % 3 === 0 ? 'rgba(129,140,248,0.8)' : i % 3 === 1 ? 'rgba(99,102,241,0.8)' : 'rgba(79,70,229,0.8)'
              }`
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Character Image */}
      <div className="relative h-full">
        <Image
          src="/images/conductor-1.png"
          alt="The Apothecary"
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          className="object-contain object-bottom drop-shadow-2xl"
          priority
        />
      </div>
    </div>
  )
}

export default ConductorWithEffect
