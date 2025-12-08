import React, { FC } from 'react'
import HomeHeroCarousel from './HomeHeroCarousel'
import { usePhotoSelector, useTextBlockSelector } from '@/app/redux/store'
import EditableTextArea from '../common/EditableTextArea'
import { motion } from 'framer-motion'

const HomeHero: FC<{ handleScroll: () => void }> = ({ handleScroll }) => {
  const { photoGalleryImages } = usePhotoSelector()
  const { textBlockMap } = useTextBlockSelector()
  const filteredImages = photoGalleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      className="relative min-h-[600px] h-dvh w-full mt-[-160px]"
    >
      <div className="absolute inset-0 z-40 bg-black/40 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto text-center">
          <EditableTextArea
            tag="h1"
            initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle1}
            type="HOME_HERO_BLOCK"
            textBlockKey="homeHeroBlockTitle1"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-lato leading-tight text-white mb-2 sm:mb-4"
          />
          <EditableTextArea
            tag="h2"
            initialValue={textBlockMap?.HOME_HERO_BLOCK?.homeHeroBlockTitle2}
            type="HOME_HERO_BLOCK"
            textBlockKey="homeHeroBlockTitle2"
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium font-lato leading-relaxed text-white mb-8 sm:mb-10 lg:mb-12 opacity-90"
          />
          <button
            onClick={handleScroll}
            className="bg-blaze font-changa uppercase whitespace-nowrap rounded-lg text-xs sm:text-sm lg:text-base font-bold tracking-widest hover:bg-blazehover focus:outline-none focus:ring-2 focus:ring-blaze focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-opacity-60 relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-white/20 gap-2"
          >
            {/* Animated background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            {/* Pulsing dot effect */}
            <motion.div
              className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity
              }}
            />
            See Concerts
          </button>
        </div>
      </div>
      <HomeHeroCarousel images={filteredImages} interval={5000} />
    </motion.div>
  )
}

export default HomeHero
