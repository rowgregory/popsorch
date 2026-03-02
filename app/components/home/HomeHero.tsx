import { motion, useReducedMotion } from 'framer-motion'
import { HomeHeroCarousel } from '../carousels/HomeHeroCarousel'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import Picture from '../common/Picture'

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
      aria-label="Hero: The Pops Orchestra of Sarasota and Bradenton"
      initial={sectionVariants.initial}
      animate={sectionVariants.animate}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeIn' }}
      className="relative w-full min-h-125 h-dvh max-h-1000 -mt-16 sm:-mt-20"
    >
      <HomeHeroCarousel images={filteredImages} interval={shouldReduceMotion ? 0 : 5000} />

      {/* Overlay */}
      <div className="absolute inset-0 z-40 flex flex-col justify-end pb-16 430:pb-20 990:pb-28 px-4 990:px-12 xl:px-4">
        {/* Gradient behind text */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" aria-hidden="true" />

        <div className="relative z-10 max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl mx-auto w-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="mb-8 430:mb-10"
          >
            <Link
              href="/"
              aria-label="The Pops Orchestra — home"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm inline-block"
            >
              <Picture
                src="/images/golden-logo.png"
                alt="The Pops Orchestra logo"
                width={160}
                height={160}
                priority={true}
                className="w-24 430:w-60 h-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-4 430:mb-5"
          >
            <div className="w-6 h-px bg-blaze" aria-hidden="true" />
            <span className="font-changa text-xs uppercase tracking-[0.3em] text-blaze">{headingPrefix}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.35 }}
            className="font-changa text-white leading-none mb-4 430:mb-6"
            style={{ fontSize: 'clamp(2.25rem, 8vw, 6rem)' }}
          >
            <span className="sr-only">{heading}</span>
            <span aria-hidden="true">{headingMain}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.55 }}
            className="w-16 h-px bg-blaze mb-4 430:mb-6 origin-left"
            aria-hidden="true"
          />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.65 }}
            className="font-lato text-white/70 leading-relaxed mb-8 430:mb-10 border-l-2 border-blaze pl-5 max-w-xl"
            style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1.125rem)' }}
          >
            {hero?.subheading}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.75 }}
          >
            <motion.button
              type="button"
              aria-label={hero?.btnText ? `${hero.btnText} — scroll to content` : 'Scroll to content'}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              onClick={handleScroll}
              className="group inline-flex items-center gap-2 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer"
              style={{
                fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)',
                padding: 'clamp(0.625rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 2rem)'
              }}
            >
              <span>{hero?.btnText}</span>
              <ArrowRightIcon
                className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 430:bottom-8 right-4 430:right-8 z-10 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-lato text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-linear-to-b from-blaze to-transparent"
          />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HomeHero
