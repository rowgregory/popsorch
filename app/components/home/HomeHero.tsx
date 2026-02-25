import HomeHeroCarousel from './HomeHeroCarousel'
import { motion } from 'framer-motion'
import { sendGAEvent } from '@next/third-parties/google'

const HomeHero = ({ pageData, ref, galleryImages }) => {
  if (!pageData || !Array.isArray(pageData)) {
    return null // or return a fallback UI
  }

  const filteredImages = galleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  const handleScroll = () => {
    sendGAEvent('event', 'view_concerts', {
      value: 'see_concerts',
      button_text: 'See Concerts',
      section: 'home_hero',
      user_scroll_depth: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
      time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
      referrer: document.referrer || 'direct',
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      timestamp: new Date().toISOString()
    })
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroData = pageData?.filter((page) => page?.id?.includes('hero'))

  const hero = heroData.reduce((acc, field) => {
    const key = field.id.replace('hero_', '')
    acc[key] = field.value
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
      className="relative w-full min-h-125 h-dvh max-h-1000 -mt-25"
    >
      <div className="absolute inset-0 z-40 bg-black/20 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          {(() => {
            const heading = hero?.heading || ''
            const parts = heading.split(' of ')

            return (
              <div className="mb-4 sm:mb-6 lg:mb-8 uppercase">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-widest text-white/90 -mb-2 font-changa">
                  {parts[0]} of
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-white font-changa">
                  {parts[1]}
                </h1>
              </div>
            )
          })()}

          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium font-lato leading-relaxed text-white mb-6 sm:mb-8 lg:mb-12 opacity-90 max-w-xs sm:max-w-xl mx-auto">
            {hero?.subheading}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScroll}
            className="relative inline-flex items-center gap-2 bg-blaze hover:bg-blaze/90 text-white font-changa uppercase whitespace-nowrap rounded-lg text-xs sm:text-sm md:text-base font-bold tracking-widest px-5 py-2.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blaze focus:ring-offset-2 focus:ring-offset-black"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 opacity-0"
              animate={{ x: ['-100%', '100%'], opacity: [0, 1, 0] }}
              transition={{ duration: 2, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.div
              className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
            <span className="relative z-10">{hero?.btnText}</span>
          </motion.button>
        </div>
      </div>
      <HomeHeroCarousel images={filteredImages} interval={5000} />
    </motion.div>
  )
}

export default HomeHero
