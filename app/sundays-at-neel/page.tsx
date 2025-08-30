'use client'

import React from 'react'
import { motion } from 'framer-motion'
import TitleWithLine from '../components/common/TitleWithLine'
import { RootState, useAppSelector } from '../redux/store'
import { ConcertProps } from '../redux/features/concertSlice'
import Link from 'next/link'
import Marquee from 'react-fast-marquee'
import PricingBanner from '../components/sundays-at-neel/PricingBanner'
import ConcertCard from '../components/sundays-at-neel/ConcertCard'
import { Star } from 'lucide-react'

const orchestraSections = ['Strings', 'Woodwinds', 'Brass', 'Percussion', 'Harp', 'Piano', 'Conductor', 'Choir']

const orchestraMovements = ['Overture', 'Allegro', 'Adagio', 'Scherzo', 'Finale', 'Cadenza', 'Intermezzo', 'Reprise']

const SundaysAtNeel = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const filteredConcerts = concerts?.filter((concert) => concert.type === 'Sundays-at-Neel')

  return (
    <div className="min-h-dvh bg-[#111419] text-white">
      <div
        className="bg-grain bg-repeat bg-center w-[300%] h-[300%] opacity-10 -left-1/2 top-[-110%] fixed animate-grain"
        style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
      />
      <div className="p-8">
        <Link href="/" className="cursor-pointer relative z-10">
          <div className={`bg-golden50Logo bg-no-repeat bg-contain bg-center w-20 h-20`} />
        </Link>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative h-[1400px] flex justify-center overflow-hidden">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-32">
          <motion.h1
            className="font-changa text-5xl md:text-[112px] font-bold mb-6 text-white drop-shadow-2xl uppercase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Sundays @{' '}
            <span className="bg-gradient-to-r from-blaze to-sunburst bg-clip-text text-transparent">Neel</span>
          </motion.h1>

          {/* Option 5: Audio Visualizer Style */}

          <motion.div
            className="text-center mt-40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex justify-center items-end gap-2 mb-6 h-20">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-blaze to-sunburst w-3 rounded-t"
                  animate={{
                    height: [Math.random() * 40 + 20, Math.random() * 60 + 30, Math.random() * 40 + 20]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
            <div className="text-xl md:text-2xl text-white/90">
              <span className="text-blaze">LIVE</span> •<span className="text-sunburst"> INTIMATE</span> •
              <span className="text-white"> UNFORGETTABLE</span>
            </div>
          </motion.div>
        </div>

        {/* First Marquee - Top Left to Bottom Right crossing center */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-[150%] z-30 -rotate-12"
          style={{ top: 'clamp(400px, 500vh, 1000px)' }}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <Marquee
              gradient={false}
              speed={100}
              className="py-2 bg-blaze/90 backdrop-blur-sm border-y border-white/20 shadow-2xl"
            >
              {orchestraSections.map((artist, index) => (
                <div key={index} className="mx-12 flex items-center">
                  <span className="text-white font-bold text-3xl md:text-4xl tracking-wider drop-shadow-lg font-changa uppercase">
                    {artist}
                  </span>
                  <div className="mx-8 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>

        {/* Second Marquee - Top Right to Bottom Left crossing center */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-[150%] z-20 rotate-12"
          style={{ top: 'clamp(420px, 500vh, 1020px)' }}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.0 }}
          >
            <Marquee
              gradient={false}
              speed={80}
              direction="right"
              className="py-2 bg-sunburst/90 backdrop-blur-sm border-y border-white/20 shadow-2xl"
            >
              {orchestraMovements.map((venue, index) => (
                <div key={index} className="mx-12 flex items-center">
                  <span className="text-white font-bold text-3xl md:text-4xl tracking-wider drop-shadow-lg font-changa uppercase">
                    {venue}
                  </span>
                  <div className="mx-8 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 flex items-center flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TitleWithLine title="Featured Events" textBlockKey="sundaysAtNeelPageTitle" type="SUNDAYS_AT_NEEL" />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Don&apos;t miss these incredible upcoming performances
            </p>

            {/* Pricing Banner */}
            <div className="w-full max-w-4xl">
              <PricingBanner />
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredConcerts?.map((concert: ConcertProps, index: number) => (
              <ConcertCard key={concert.id} concert={concert} index={index} />
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blaze/10 to-sunburst/10 border border-blaze/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to experience all three concerts?</h3>
              <p className="text-gray-400 mb-6">
                Get the best value and save $30 when you purchase tickets to all three performances
              </p>
              <motion.button
                className="bg-gradient-to-r from-blaze to-sunburst text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-5 h-5" />
                Buy All 3 Concerts - Save $30
              </motion.button>
              <div className="text-sm text-lime-400 mt-2">Only $75 total (normally $105)</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SundaysAtNeel
