import React from 'react'
import { motion } from 'framer-motion'

const NeonSubscriptionBanner = () => {
  return (
    <div className="relative py-40 overflow-hidden flex flex-col items-center justify-center">
      {/* Animated light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/30 via-white/10 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleY: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 text-center space-y-20 px-8">
        {/* June 16 - New Season Subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-4"
        >
          {/* Date */}
          <motion.div
            animate={{
              textShadow: [
                '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444',
                '0 0 15px #ef4444, 0 0 30px #ef4444, 0 0 45px #ef4444',
                '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-blaze text-xl md:text-2xl font-bold tracking-[0.3em] mb-6"
          >
            JUNE 16
          </motion.div>

          {/* New Season Subscriptions */}
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 60px #ffffff',
                '0 0 30px #ffffff, 0 0 60px #ffffff, 0 0 90px #ffffff',
                '0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 60px #ffffff'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-white text-4xl md:text-6xl lg:text-8xl font-black tracking-wider leading-tight"
            style={{
              textShadow: '0 0 20px #ffffff, 0 0 40px #ffffff, 0 0 60px #ffffff'
            }}
          >
            NEW SEASON
            <br />
            SUBSCRIPTIONS
          </motion.h1>
        </motion.div>

        {/* August 1 - Single Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="space-y-4"
        >
          {/* Date */}
          <motion.div
            animate={{
              textShadow: [
                '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444',
                '0 0 15px #ef4444, 0 0 30px #ef4444, 0 0 45px #ef4444',
                '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5
            }}
            className="text-blaze text-xl md:text-2xl font-bold tracking-[0.3em] mb-6"
          >
            AUGUST 1
          </motion.div>

          {/* Single Tickets */}
          <motion.h2
            animate={{
              textShadow: [
                '0 0 20px #ff9000, 0 0 40px #ff9000, 0 0 60px #ff9000',
                '0 0 30px #ff9000, 0 0 60px #ff9000, 0 0 90px #ff9000',
                '0 0 20px #ff9000, 0 0 40px #ff9000, 0 0 60px #ff9000'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1
            }}
            className="text-sunburst text-4xl md:text-6xl lg:text-8xl font-black tracking-wider"
            style={{
              textShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #fbbf24'
            }}
          >
            SINGLE TICKETS
          </motion.h2>
        </motion.div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}

export default NeonSubscriptionBanner
