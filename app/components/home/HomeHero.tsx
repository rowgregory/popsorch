import { motion, useReducedMotion } from 'framer-motion'
import { HomeHeroCarousel } from './HomeHeroCarousel'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

const HomeHero = ({ pageData, ref, galleryImages }) => {
  const shouldReduceMotion = useReducedMotion()

  if (!pageData || !Array.isArray(pageData)) {
    return null
  }

  const filteredImages = galleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  const handleScroll = () => {
    sendEnrichedGAEvent('view_concerts', 'see_concerts', 'See Concerts', 'home_hero')
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroData = pageData?.filter((page) => page?.id?.includes('hero'))

  const hero = heroData.reduce((acc, field) => {
    const key = field.id.replace('hero_', '')
    acc[key] = field.value
    return acc
  }, {})

  const heading = hero?.heading || ''
  const parts = heading.split(' of ')
  const headingPrefix = parts[0] ? `${parts[0]} of` : ''
  const headingMain = parts[1] || ''

  // Respect prefers-reduced-motion for entrance animation
  const sectionVariants = {
    initial: { opacity: shouldReduceMotion ? 1 : 0 },
    animate: { opacity: 1 }
  }

  return (
    <motion.section
      role="banner"
      aria-label="Hero: The Pops Orchestra of Sarasota and Brandenton"
      initial={sectionVariants.initial}
      animate={sectionVariants.animate}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeIn' }}
      className="relative w-full min-h-125 h-dvh max-h-1000 -mt-16 sm:-mt-20"
    >
      <div className="absolute inset-0 z-40 bg-black/20 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto text-center">
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <h1 className="uppercase font-changa text-white leading-none">
              <span
                className="block font-light tracking-widest text-white/90 -mb-2"
                style={{ fontSize: 'clamp(1rem, 4vw, 3rem)' }}
                aria-hidden="true"
              >
                {headingPrefix}
              </span>
              <span className="sr-only">{heading}</span>
              <span className="block" style={{ fontSize: 'clamp(2.25rem, 10vw, 6rem)' }} aria-hidden="true">
                {headingMain}
              </span>
            </h1>
          </div>

          <p
            className="font-medium font-lato leading-relaxed text-white mb-6 sm:mb-8 lg:mb-12 opacity-90 max-w-xs sm:max-w-xl mx-auto"
            style={{ fontSize: 'clamp(0.7rem, 2vw, 1.125rem)' }}
          >
            {hero?.subheading}
          </p>

          <motion.button
            type="button"
            aria-label={hero?.btnText ? `${hero.btnText} — scroll to content` : 'Scroll to content'}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
            onClick={handleScroll}
            style={{ fontSize: 'clamp(0.65rem, 1.5vw, 1rem)' }}
            className={[
              'relative inline-flex items-center gap-2',
              'bg-blaze hover:bg-blaze/90 text-white',
              'font-changa uppercase whitespace-nowrap rounded-lg',
              'font-bold tracking-widest',
              'px-[clamp(0.875rem,3vw,2.5rem)] py-[clamp(0.5rem,1.5vw,1.25rem)]',
              'shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden',
              'border-2 border-transparent hover:border-white/20',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            ].join(' ')}
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-white/10 opacity-0"
              animate={shouldReduceMotion ? {} : { x: ['-100%', '100%'], opacity: [0, 1, 0] }}
              transition={shouldReduceMotion ? {} : { duration: 2, ease: 'linear', repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={shouldReduceMotion ? {} : { duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
            <span className="relative z-10">{hero?.btnText}</span>
          </motion.button>
        </div>
      </div>

      <HomeHeroCarousel images={filteredImages} interval={shouldReduceMotion ? 0 : 5000} />
    </motion.section>
  )
}

export default HomeHero
