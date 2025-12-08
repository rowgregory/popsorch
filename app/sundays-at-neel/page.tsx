'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import TitleWithLine from '../components/common/TitleWithLine'
import { RootState, useAppSelector } from '../redux/store'
import Link from 'next/link'
import PricingBanner from '../components/sundays-at-neel/PricingBanner'
import ConcertCard from '../components/sundays-at-neel/ConcertCard'
import EditableTextArea from '../components/common/EditableTextArea'
import { IConcert } from '../types/entities/concert'

const SundaysAtNeel = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const sectionRef = useRef(null) as any

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

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

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
      <section id="home" className="relative flex justify-center overflow-hidden">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-32">
          <motion.h1
            className="font-changa text-5xl md:text-[112px] font-bold mb-6 text-white drop-shadow-2xl uppercase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Sundays@
            <span className="bg-gradient-to-r from-blaze to-sunburst bg-clip-text text-transparent">Neel</span>
          </motion.h1>
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
            <TitleWithLine
              title={textBlockMap?.SUNDAYS_AT_NEEL?.sundaysAtNeelPageTitle}
              textBlockKey="sundaysAtNeelPageTitle"
              type="SUNDAYS_AT_NEEL"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.SUNDAYS_AT_NEEL?.sundaysAtNeelPageSubtitle}
              type="SUNDAYS_AT_NEEL"
              textBlockKey="sundaysAtNeelPageSubtitle"
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 relative z-[60]"
            />

            {/* Pricing Banner */}
            <div className="w-full max-w-4xl">
              <PricingBanner scrollToSection={scrollToSection} />
            </div>
          </motion.div>

          <motion.div
            ref={sectionRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            whileInView="visible"
            viewport={{ once: true }}
          >
            {filteredConcerts?.map((concert: IConcert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SundaysAtNeel
