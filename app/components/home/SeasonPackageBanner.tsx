'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RootState, useAppSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'

const SeasonPackageBanner = () => {
  const app = useAppSelector((state: RootState) => state.app)
  const { user } = useAppSelector((state: RootState) => state.user)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const shouldShowBanner =
    app.isSeasonPackageBannerToggledLive || (app.isSeasonPackageBannerToggledVisible && user?.isAdmin)
  if (!shouldShowBanner) return null

  return (
    <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-40 pb-24 990:py-60 mt-24">
      {/* Luxurious Gold Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              #1a1a1a 0%, 
              #2d2016 15%, 
              #4a3728 30%, 
              #6b4e37 45%, 
              #8b6914 60%, 
              #b8860b 75%, 
              #daa520 90%, 
              #ffd700 100%
            )
          `
        }}
      />

      {/* Elegant Gold Shimmer Overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)',
          backgroundSize: '300% 300%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Subtle Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Fade to Background - Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/80 to-transparent pointer-events-none z-20" />

      {/* Content Container - Full Width */}
      <motion.div
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-24 990:py-40"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          {/* Golden Anniversary Badge */}
          <motion.div variants={scaleIn} className="mb-12">
            <div className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 backdrop-blur-sm border-2 border-yellow-400/40 rounded-full shadow-2xl">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4 shadow-lg shadow-yellow-400/50" />
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <EditableTextArea
                  tag="span"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.topBadgeText}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey="topBadgeText"
                  className="text-yellow-100 font-bold text-base 990:text-lg tracking-wider uppercase"
                />
              </motion.div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full ml-4 shadow-lg shadow-yellow-400/50" />
            </div>
          </motion.div>

          {/* Magnificent Main Headline */}
          <motion.div variants={fadeInUp} className="mb-12">
            <motion.h1
              className="font-changa text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white leading-tight mb-6"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 40px rgba(255,215,0,0.8)',
                  '0 0 20px rgba(255,215,0,0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <EditableTextArea
                tag="span"
                initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerTitle || 'Season Packages'}
                type="SEASON_PACKAGE_BANNER"
                textBlockKey="seasonPackageBannerTitle"
              />
              <motion.span
                className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                style={{ backgroundSize: '200% 200%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <EditableTextArea
                  tag="span"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerSubtitle}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey="seasonPackageBannerSubtitle"
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Elegant Subheading */}
          <motion.div variants={fadeInUp} className="mb-16">
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerParagraph}
              type="SEASON_PACKAGE_BANNER"
              textBlockKey="seasonPackageBannerParagraph"
              className="font-lato text-xl lg:text-2xl xl:text-3xl text-yellow-100 max-w-4xl mx-auto leading-relaxed font-light"
            />
          </motion.div>

          {/* Premium Call to Action - Two Button Layout */}
          <motion.div variants={fadeInUp} className="mb-20">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center">
              {/* Single Tickets Button */}
              <motion.div
                onClick={() => {
                  window.open('https://ci.ovationtix.com/35505', '_blank')
                }}
                className="group relative inline-flex items-center px-8 lg:px-12 py-5 lg:py-7 bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white font-changa font-bold text-lg lg:text-xl xl:text-2xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer w-full lg:w-auto min-w-[240px] justify-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(255, 165, 0, 0.6)',
                  y: -5
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {/* Luxurious shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                {/* Orange border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-orange-300/50 group-hover:border-orange-200/80 transition-colors duration-300" />

                <span className="relative z-10 tracking-wide">Single Tickets</span>
              </motion.div>

              {/* Package Button */}
              <motion.div
                onClick={() => {
                  if (!user.isAdmin) {
                    window.open('https://ci.ovationtix.com/35505/store/packages', '_blank')
                  }
                }}
                className="group relative inline-flex items-center px-8 lg:px-12 py-5 lg:py-7 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-500 text-white font-changa font-bold text-lg lg:text-xl xl:text-2xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 cursor-pointer w-full lg:w-auto min-w-[240px] justify-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.6)',
                  y: -5
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {/* Luxurious shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

                {/* Golden border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300/50 group-hover:border-yellow-200/80 transition-colors duration-300" />

                <EditableTextArea
                  tag="span"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.seasonPackageBannerButtonText}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey="seasonPackageBannerButtonText"
                  className="relative z-10 tracking-wide"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Premium Features Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20"
          >
            {[
              {
                titleKey: 'goldenCircleTitle',
                descriptionKey: 'goldenCircleDescription'
              },
              {
                titleKey: 'anniversaryPerksTitle',
                descriptionKey: 'anniversaryPerksDescription'
              },
              {
                titleKey: 'legacyBenefitsTitle',
                descriptionKey: 'legacyBenefitsDescription'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-b from-yellow-600/10 to-amber-600/5 backdrop-blur-sm rounded-2xl border border-yellow-400/20 shadow-xl"
                whileHover={{
                  y: -8,
                  backgroundColor: 'rgba(255,215,0,0.1)',
                  borderColor: 'rgba(255,215,0,0.4)',
                  scale: 1.02
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(255,215,0,0.1)',
                    '0 15px 40px rgba(255,215,0,0.2)',
                    '0 10px 30px rgba(255,215,0,0.1)'
                  ]
                }}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '4s',
                  animationIterationCount: 'infinite'
                }}
              >
                <EditableTextArea
                  tag="h3"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.[feature.titleKey]}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey={feature.titleKey}
                  className="font-changa text-2xl lg:text-3xl font-bold text-yellow-200 mb-4"
                />

                <EditableTextArea
                  tag="p"
                  initialValue={textBlockMap?.SEASON_PACKAGE_BANNER?.[feature.descriptionKey]}
                  type="SEASON_PACKAGE_BANNER"
                  textBlockKey={feature.descriptionKey}
                  className="font-lato text-yellow-100/90 text-base lg:text-lg leading-relaxed"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Ornate Golden Divider */}
          <motion.div variants={scaleIn} className="flex items-center justify-center space-x-6">
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-yellow-400/70 flex-1 max-w-48"
              animate={{
                opacity: [0.4, 1, 0.4],
                scaleX: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="flex items-center space-x-3"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-4 h-4 bg-yellow-400 rotate-45 shadow-lg shadow-yellow-400/50" />
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full shadow-lg shadow-yellow-400/50" />
              <div className="w-4 h-4 bg-yellow-400 rotate-45 shadow-lg shadow-yellow-400/50" />
            </motion.div>
            <motion.div
              className="h-px bg-gradient-to-l from-transparent via-yellow-400/70 to-yellow-400/70 flex-1 max-w-48"
              animate={{
                opacity: [0.4, 1, 0.4],
                scaleX: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5
              }}
            />
          </motion.div>
        </div>

        {/* Luxurious Corner Ornaments */}
        <div className="hidden sm:block absolute top-12 left-12 w-32 h-32 border-l-3 border-t-3 border-yellow-400/40 rounded-tl-3xl" />
        <div className="hidden sm:block absolute bottom-12 right-12 w-32 h-32 border-r-3 border-b-3 border-yellow-400/40 rounded-br-3xl" />

        {/* Floating Golden Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-400/60 rounded-full shadow-lg shadow-yellow-400/30"
            style={{
              width: `${4 + (i % 3)}px`,
              height: `${4 + (i % 3)}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default SeasonPackageBanner
