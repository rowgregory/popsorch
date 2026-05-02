import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { HomeHeroCarousel } from '../../carousels/HomeHeroCarousel'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, Phone, Ticket, User, X } from 'lucide-react'
import LogoSVG from '../../svg/LogoSVG'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Concerts', href: '/concerts' },
  { label: 'Events', href: '#events' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '/contact' }
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`px-6 sm:px-10 lg:px-16 absolute top-0 inset-x-0 z-50 transition-all duration-300 pt-5 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm' : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 sm:h-20 max-w-285 mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className={`font-c-infant font-bold text-xl sm:text-2xl tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032] ${
              scrolled ? 'text-neutral-900' : 'text-white'
            }`}
            aria-label="The Pops Orchestra — home"
          >
            <LogoSVG className="w-24" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" role="list">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="listitem"
                className={`font-heebo tracking-wider uppercase text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032] focus-visible:ring-offset-2 ${
                  scrolled ? 'text-neutral-600 hover:text-[#da0032]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — phone + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/auth/login">
              <User />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`lg:hidden p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032] ${
              scrolled ? 'text-neutral-900' : 'text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-neutral-100 shadow-lg lg:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center py-3 font-heebo text-neutral-700 hover:text-[#da0032] transition-colors border-b border-neutral-50 last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:9419267677"
                  className="flex items-center gap-2 font-heebo text-sm text-neutral-500 focus-visible:outline-none"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  941-926-POPS (7677)
                </a>
                <Link
                  href="/concerts"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#da0032] hover:bg-secondary-light text-white font-heebo text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032]"
                >
                  <Ticket className="w-4 h-4" aria-hidden="true" />
                  Get Tickets
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const HeroSection = ({ pageData, galleryImages, concerts }) => {
  const shouldReduceMotion = useReducedMotion()

  if (!pageData || !Array.isArray(pageData)) {
    return null
  }

  const filteredImages = galleryImages?.filter((item: { isHomeHero: boolean }) => item.isHomeHero)

  const heroData = pageData?.filter((page) => page?.id?.includes('hero'))

  const hero = heroData.reduce((acc, field) => {
    const key = field.id.replace('hero_', '')
    acc[key] = field.value
    return acc
  }, {})

  const heading = hero?.heading || ''
  const parts = heading.split(' Like ')
  const headingPrefix = parts[0]
  const headingMain = `like ${parts[1]}` || ''

  // Respect prefers-reduced-motion for entrance animation
  const sectionVariants = {
    initial: { opacity: shouldReduceMotion ? 1 : 0 },
    animate: { opacity: 1 }
  }

  const next = concerts
    ?.filter((c) => c.status === 'LIVE')
    ?.sort((a, b) => new Date(a.cardDate).getTime() - new Date(b.cardDate).getTime())[0]

  return (
    <>
      <motion.section
        role="banner"
        aria-label="Hero: The Pops Orchestra of Sarasota and Bradenton"
        initial={sectionVariants.initial}
        animate={sectionVariants.animate}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeIn' }}
        className="relative w-full h-205"
      >
        <HomeHeroCarousel images={filteredImages} interval={shouldReduceMotion ? 0 : 5000} />

        {/* Overlay */}
        <div className="absolute inset-0 z-40 flex flex-col justify-center pb-16 430:pb-20 990:pb-28 px-4 990:px-12 xl:px-4">
          {/* Gradient behind text */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Main bottom gradient */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(180deg, #060606DB 0%, #1F1D1EBD 33%)',
                transition: 'background 0.3s, border-radius 0.3s, opacity 0.3s'
              }}
            />
          </div>

          <Nav />

          <div className="relative z-10 max-w-285 mx-auto w-full pt-10">
            {/* Eyebrow — big display name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
              className="mb-3"
            >
              <p
                className="font-c-infant text-white leading-none drop-shadow-2xl tracking-wide font-semibold uppercase"
                style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5rem)' }}
              >
                {headingPrefix}
              </p>
            </motion.div>

            {/* Title — refined subtitle */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.35 }}
              className="font-c-infant leading-none pl-1"
            >
              <span className="sr-only">{heading}</span>
              <span
                aria-hidden="true"
                className="text-white uppercase font-light"
                style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5rem)' }}
              >
                {headingMain}
              </span>
            </motion.h1>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 1.2, duration: 0.6 }}
            className="absolute bottom-6 430:bottom-8 right-4 430:right-8 z-10 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-linear-to-b from-blaze to-transparent"
            />
          </motion.div>
        </div>
      </motion.section>
      <div className="max-w-285 mx-auto w-full relative">
        <div className="bg-white z-50 absolute -bottom-20 left-0 w-125 shadow-2xl p-8 flex flex-col justify-between gap-6">
          {next ? (
            <>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#da0032]" aria-hidden="true" />
                  <span className="font-heebo text-[10px] tracking-[0.3em] uppercase text-[#da0032]">
                    Next Performance · {next.cardDate}
                  </span>
                </div>
                <h2 className="font-c-infant font-bold text-3xl text-neutral-900 leading-tight mb-2">{next.name}</h2>
                {next.subtitle && <p className="font-heebo text-neutral-500 text-sm">{next.subtitle}</p>}
              </div>
              <Link
                href={`/concerts/${next.id}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#da0032] hover:bg-secondary-light text-white font-heebo text-sm tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032] focus-visible:ring-offset-2 w-fit"
              >
                <Ticket className="w-4 h-4" aria-hidden="true" />
                Buy Tickets
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-[#da0032]" aria-hidden="true" />
                  <span className="font-heebo text-[10px] tracking-[0.3em] uppercase text-[#da0032]">
                    2026–2027 Season
                  </span>
                </div>
                <h2 className="font-c-infant font-bold text-3xl text-neutral-900 leading-tight mb-2">
                  Music You Love.
                </h2>
                <p className="font-heebo text-neutral-500 text-sm">Six unforgettable nights of music this season.</p>
              </div>
              <Link
                href="/concerts"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#da0032] hover:bg-secondary-light text-white font-heebo text-sm tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032] focus-visible:ring-offset-2 w-fit"
              >
                View All Concerts
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}
