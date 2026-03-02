'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/common/Picture'
import { sendEnrichedGAEvent } from '@/app/utils/sendEnrichedGAEvent'

const tickets = [
  {
    tier: 'Ultimate VIP Table for 6',
    price: '$1,250',
    gradient: 'from-[#ff9000] to-[#da0032]',
    accent: 'shadow-[0_0_30px_#ff9000aa]',
    halfTableNote: '(1/2 table also available)',
    perks: [
      'VIP admission for 6 guests',
      'Valet parking',
      'On-stage round table seating',
      'Bottle of champagne for the table',
      'Raffle entries for each guest (necklace + dinner experience)'
    ]
  },
  {
    tier: 'Sponsor VIP Table for 8',
    price: '$1,050',
    gradient: 'from-[#da0032] to-[#ff9000]',
    accent: 'shadow-[0_0_25px_#da0032aa]',
    halfTableNote: '',
    perks: [
      'VIP admission for 8 guests',
      'Valet parking',
      'Front stage round table seating',
      'Bottle of champagne for the table',
      'Raffle entries for each guest (necklace + dinner experience)'
    ],
    isSoldOut: true
  },
  {
    tier: 'Gold',
    price: '$100.50',
    gradient: 'from-[#da0032] to-[#ff9000]',
    accent: 'shadow-[0_0_20px_#ff9000aa]',
    perks: [
      'General Admission',
      'Raffle entry for a Mikimoto pearl necklace',
      "Raffle entry for dinner for six with 'Chef Robyn' and Pops String Quartet"
    ]
  },
  {
    tier: 'Silver',
    price: '$75.50',
    gradient: 'from-gray-400 to-[#ff9000]',
    accent: 'shadow-[0_0_15px_#ff9000aa]',
    perks: ['General Admission', 'Raffle entry for a Mikimoto pearl necklace from Armel Jewelers']
  },
  {
    tier: 'Bronze',
    price: '$50.50',
    gradient: 'from-[#b87333] to-[#ff9000]',
    accent: 'shadow-[0_0_10px_#b87333aa]',
    perks: ['General Admission']
  }
]

const PopsLogo = () => (
  <div className="absolute top-4 left-4">
    <Link href="/" className="cursor-pointer relative z-10">
      <div className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-12 h-12 sm:w-20 sm:h-20" />
    </Link>
  </div>
)

const BubbleBash = () => {
  return (
    <main id="bubble-bash" className="min-h-screen bg-[#040608] text-white">
      <PopsLogo />
      {/* HERO SECTION */}
      <section
        aria-labelledby="hero-heading"
        className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="fixed inset-0 object-cover object-center h-full w-full"
        >
          <source src="/videos/bubbles.mp4" type="video/mp4" />
        </video>

        {/* Black Overlay */}
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

        <Picture
          src="/images/bubbles-logo.png"
          alt="The Pops Orchestra Golden Bubbles Bash"
          priority
          className="relative object-contain object-center h-full w-full max-w-2xl 2xl:max-w-4xl z-10"
        />

        {/* sr-only heading for screen readers */}
        <h1 id="hero-heading" className="sr-only">
          The Pops Orchestra Golden Bubbles Bash
        </h1>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          aria-label="Scroll down to content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sm tracking-widest uppercase hidden sm:block"
            aria-hidden="true"
            style={{
              color: '#d4af37',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              fontWeight: 600
            }}
          >
            Scroll Down
          </motion.p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
            aria-hidden="true"
          >
            <div
              className="w-7 h-11 border-2 rounded-full flex justify-center pt-2"
              style={{ borderColor: '#d4af37', boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, #f4d03f, #d4af37)',
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)'
                }}
              />
            </div>
          </motion.div>
        </motion.button>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <section aria-labelledby="gala-details-heading" className="relative py-24 overflow-hidden">
          {/* Animated bubbles + music notes — all decorative */}
          <div className="absolute inset-0" aria-hidden="true">
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-[15%] w-24 h-24 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 252, 240, 0.4), rgba(255, 255, 255, 0.1))',
                boxShadow:
                  '0 0 30px rgba(255, 255, 255, 0.3), inset -8px -8px 16px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(255, 252, 240, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            />
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-32 right-[12%] w-32 h-32 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), rgba(255, 252, 240, 0.5), rgba(255, 255, 255, 0.1))',
                boxShadow:
                  '0 0 40px rgba(255, 255, 255, 0.4), inset -10px -10px 20px rgba(255, 255, 255, 0.7), inset 10px 10px 20px rgba(255, 252, 240, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            />
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 left-[10%] w-28 h-28 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 250, 230, 0.4), rgba(255, 255, 255, 0.1))',
                boxShadow:
                  '0 0 35px rgba(255, 255, 255, 0.35), inset -9px -9px 18px rgba(255, 255, 255, 0.65), inset 9px 9px 18px rgba(255, 250, 230, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.35)'
              }}
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-40 right-[20%] w-20 h-20 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.75), rgba(255, 252, 240, 0.4), rgba(255, 255, 255, 0.1))',
                boxShadow:
                  '0 0 25px rgba(255, 255, 255, 0.3), inset -7px -7px 14px rgba(255, 255, 255, 0.6), inset 7px 7px 14px rgba(255, 252, 240, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            />
            <motion.div
              animate={{ y: [0, -15, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[25%] left-[25%] w-12 h-12 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 252, 240, 0.5), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4), inset -5px -5px 10px rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            />
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[60%] right-[30%] w-10 h-10 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), rgba(255, 252, 240, 0.45), rgba(255, 255, 255, 0.1))',
                boxShadow: '0 0 18px rgba(255, 255, 255, 0.35), inset -4px -4px 8px rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.35)'
              }}
            />
            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[30%] left-[35%] w-14 h-14 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 250, 230, 0.5), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 22px rgba(255, 255, 255, 0.4), inset -6px -6px 12px rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.4)'
              }}
            />
            <div
              className="absolute top-[15%] right-[40%] w-6 h-6 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 252, 240, 0.6), rgba(255, 255, 255, 0.2))',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            />
            <div
              className="absolute top-[45%] left-[20%] w-5 h-5 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 252, 240, 0.55), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.45), inset -2px -2px 5px rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.45)'
              }}
            />
            <div
              className="absolute bottom-[25%] right-[15%] w-8 h-8 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 250, 230, 0.5), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.45), inset -4px -4px 8px rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.45)'
              }}
            />
            <motion.div
              animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[20%] right-[25%] text-4xl opacity-40"
              style={{ color: '#d4af37', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }}
            >
              ♪
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 0], y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[35%] left-[18%] text-3xl opacity-30"
              style={{ color: '#d4af37', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }}
            >
              ♫
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 12, 0], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[15%] right-[35%] text-2xl opacity-35"
              style={{ color: '#d4af37', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))' }}
            >
              ♪
            </motion.div>
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Top flourish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
              aria-hidden="true"
            >
              <div
                className="w-32 h-0.5 mx-auto mb-4"
                style={{
                  background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              />
              <svg
                className="w-12 h-12 mx-auto"
                fill="#d4af37"
                viewBox="0 0 24 24"
                style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' }}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2
                id="gala-details-heading"
                className="text-5xl md:text-6xl font-bold mb-3 font-changa"
                style={{
                  background:
                    'linear-gradient(135deg, #d4af37 0%, #f4d03f 25%, #d4af37 50%, #c9a961 75%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4))'
                }}
              >
                Golden Bubbles Bash
              </h2>
              <p className="text-2xl text-gray-300 tracking-wide">Celebrating 50 Years</p>
            </motion.div>

            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 space-y-4 text-gray-300 leading-relaxed text-base md:text-lg"
            >
              <p>
                Join us for an evening of elegance and celebration as we honor five decades of music, memories, and
                community. Guests will be greeted by the Pops Orchestra String Quartet and enjoy a lively performance by
                the Pops Jazz Combo, accompanied by hors d&apos;oeuvres, birthday cake, and a champagne toast.
              </p>
              <p>
                Throughout the evening, we will highlight memorable moments from the Pops&apos; history and hear
                reflections from Conductor Robyn Bell on the orchestra&apos;s bright future. Whether you have been part
                of the Pops family for years or are joining us for the first time, this milestone gala promises an
                unforgettable celebration of music, camaraderie, and inspiration.
              </p>
            </motion.div>

            <div
              aria-hidden="true"
              className="w-32 h-0.5 mx-auto mb-8"
              style={{
                background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
              }}
            />

            {/* Date, Time, Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <address className="not-italic space-y-2">
                <p
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)' }}
                >
                  <time dateTime="2026-04-11">Saturday, April 11, 2026</time>
                </p>
                <p
                  className="text-2xl md:text-3xl font-semibold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))'
                  }}
                >
                  <time dateTime="2026-04-11T16:30/2026-04-11T19:30">4:30 – 7:30 p.m.</time>
                </p>
                <p
                  className="text-xl font-bold text-white mb-1"
                  style={{ textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)' }}
                >
                  The Venue
                </p>
                <p className="text-gray-400">
                  <a
                    href="https://maps.google.com/?q=3650+17th+Street+Sarasota+FL+34235"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="3650 17th Street, Sarasota, FL 34235 — open in Google Maps (opens in new tab)"
                    className="hover:text-yellow-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm underline underline-offset-2"
                  >
                    3650 17th Street, Sarasota, FL 34235
                  </a>
                </p>
              </address>
            </motion.div>

            {/* Bottom flourish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8"
              aria-hidden="true"
            >
              <svg
                className="w-12 h-12 mx-auto"
                fill="#d4af37"
                viewBox="0 0 24 24"
                style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' }}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <div
                className="w-32 h-0.5 mx-auto mt-4"
                style={{
                  background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              />
            </motion.div>
          </div>
        </section>

        <motion.section
          aria-labelledby="tickets-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          {/* Background bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-[8%] w-20 h-20 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.4), rgba(135, 206, 250, 0.3))',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
              }}
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 right-[10%] w-24 h-24 rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.4), rgba(255, 182, 193, 0.3))',
                boxShadow: '0 0 35px rgba(186, 85, 211, 0.3)'
              }}
            />
          </div>

          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="tickets-heading"
                className="text-5xl font-bold mb-4 font-changa"
                style={{
                  background:
                    'linear-gradient(135deg, #d4af37 0%, #f4d03f 25%, #d4af37 50%, #c9a961 75%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4))'
                }}
              >
                Choose Your Experience
              </h2>
              <div
                aria-hidden="true"
                className="w-24 h-1 mx-auto rounded-full"
                style={{
                  background: 'linear-gradient(to right, #d4af37, #f4d03f, #d4af37)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              />
            </motion.div>
          </div>

          <ul
            role="list"
            aria-label="Ticket tiers"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative"
          >
            {tickets.map((ticket, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: ticket.isSoldOut ? 0 : -8 }}
                className="relative group"
              >
                <article
                  aria-label={`${ticket.tier} ticket${ticket.isSoldOut ? ' — sold out' : ''}`}
                  className={`relative rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col backdrop-blur-xl border transition-all duration-300 ${
                    ticket.isSoldOut
                      ? 'border-white/10 opacity-60 grayscale'
                      : 'border-white/20 group-hover:border-[#d4af37]/40'
                  }`}
                >
                  {!ticket.isSoldOut && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500"
                      style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent)' }}
                    />
                  )}

                  {ticket.isSoldOut && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
                      <div
                        className="rotate-[-25deg] px-6 py-2 border-4 border-white/30 rounded-lg"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                      >
                        <span className="text-2xl font-extrabold tracking-widest text-white/80 uppercase">
                          Sold Out
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-transparent"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="relative h-1.5 z-10"
                    style={{
                      background: ticket.isSoldOut
                        ? 'linear-gradient(to right, rgba(120,120,120,0.4), rgba(160,160,160,0.6), rgba(120,120,120,0.4))'
                        : 'linear-gradient(to right, rgba(212, 175, 55, 0.6), rgba(244, 208, 63, 0.8), rgba(212, 175, 55, 0.6))',
                      boxShadow: ticket.isSoldOut
                        ? 'none'
                        : '0 2px 15px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  />

                  <div className="relative p-8 flex flex-col grow z-10">
                    <header className="mb-8">
                      <h3
                        className="text-2xl font-bold mb-2 tracking-tight text-white/95"
                        style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
                      >
                        {ticket.tier}
                        {ticket.isSoldOut && <span className="sr-only"> — Sold Out</span>}
                      </h3>
                      {ticket.halfTableNote && (
                        <p
                          className="text-sm text-white/70 italic mb-3"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)' }}
                        >
                          {ticket.halfTableNote}
                        </p>
                      )}
                      <p
                        aria-label={`Price: ${ticket.price}`}
                        className="text-5xl font-extrabold"
                        style={{
                          background: ticket.isSoldOut
                            ? 'linear-gradient(135deg, #888, #aaa, #888)'
                            : 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: ticket.isSoldOut ? 'none' : 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4))'
                        }}
                      >
                        {ticket.price}
                      </p>
                    </header>

                    <ul aria-label={`${ticket.tier} perks`} className="space-y-4 mb-8 grow">
                      {ticket.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 shrink-0 mt-0.5"
                            fill={ticket.isSoldOut ? '#666' : '#d4af37'}
                            viewBox="0 0 20 20"
                            style={{
                              filter: ticket.isSoldOut ? 'none' : 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.5))'
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span
                            className="text-sm leading-relaxed text-white/85"
                            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}
                          >
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {ticket.isSoldOut ? (
                      <div
                        role="status"
                        aria-label={`${ticket.tier} is sold out`}
                        className="relative w-full px-4 py-4 rounded-2xl text-center font-bold overflow-hidden cursor-not-allowed"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <span className="relative font-semibold tracking-widest text-white/30 uppercase text-sm">
                          Sold Out
                        </span>
                      </div>
                    ) : (
                      <a
                        href="https://ci.ovationtix.com/35505/production/1252045?performanceId=11696147"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Select ${ticket.tier} tickets — ${ticket.price} — opens in new tab`}
                        onClick={() =>
                          sendEnrichedGAEvent(
                            'select_ticket_tier',
                            ticket.tier,
                            `Select ${ticket.tier}`,
                            'golden_bubbles_bash_page'
                          )
                        }
                        className="relative w-full px-4 py-4 rounded-2xl text-center font-bold text-white overflow-hidden group/btn backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black block"
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 transition-all duration-300 group-hover/btn:scale-[1.02]"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 208, 63, 0.95), rgba(201, 169, 97, 0.9))',
                            boxShadow:
                              '0 4px 20px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                          }}
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
                        />
                        <span
                          className="relative font-semibold tracking-wide text-gray-900"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}
                        >
                          Select {ticket.tier}
                        </span>
                      </a>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* FOOTER */}
        <footer className="mt-20 text-center text-gray-500 text-sm border-t border-inkblack pt-6">
          © {new Date().getFullYear()} The Pops Orchestra of Bradenton and Sarasota. All rights reserved.
        </footer>
      </div>
    </main>
  )
}

export default BubbleBash
