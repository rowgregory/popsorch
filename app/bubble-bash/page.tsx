'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '../components/common/Picture'
import { sendGAEvent } from '@next/third-parties/google'

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
    halfTableNote: '(1/2 table also available)',
    perks: [
      'VIP admission for 8 guests',
      'Valet parking',
      'Front stage round table seating',
      'Bottle of champagne for the table',
      'Raffle entries for each guest (necklace + dinner experience)'
    ]
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
    <div className="min-h-screen bg-[#040608] text-white">
      <PopsLogo />
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <video autoPlay loop muted playsInline className="fixed inset-0 object-cover object-center h-full w-full">
          <source src="/videos/bubbles.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Black Overlay */}
        <div className="fixed inset-0 bg-black/60"></div>

        {/* Image on top */}
        <Picture
          src="/images/bubbles-logo.png"
          alt="The Pops Orchestra 50th Anniversary Gala"
          priority
          className="relative object-contain object-center h-full w-full max-w-2xl 2xl:max-w-4xl z-10"
        />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          {/* Text */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sm tracking-widest uppercase hidden sm:block"
            style={{
              color: '#d4af37',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              fontWeight: 600
            }}
          >
            Scroll Down
          </motion.p>

          {/* Animated Golden Mouse */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div
              className="w-7 h-11 border-2 rounded-full flex justify-center pt-2"
              style={{
                borderColor: '#d4af37',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, #f4d03f, #d4af37)',
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.6)'
                }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <section className="relative py-24 overflow-hidden">
          {/* Animated champagne bubbles background */}
          <div className="absolute inset-0">
            {/* Large bubbles */}
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
            ></motion.div>

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
            ></motion.div>

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
            ></motion.div>

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
            ></motion.div>

            {/* Small bubbles */}
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
            ></motion.div>

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
            ></motion.div>

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
            ></motion.div>

            {/* Tiny accent bubbles */}
            <div
              className="absolute top-[15%] right-[40%] w-6 h-6 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(255, 252, 240, 0.6), rgba(255, 255, 255, 0.2))',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.5), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            ></div>
            <div
              className="absolute top-[45%] left-[20%] w-5 h-5 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 252, 240, 0.55), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.45), inset -2px -2px 5px rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.45)'
              }}
            ></div>
            <div
              className="absolute bottom-[25%] right-[15%] w-8 h-8 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 250, 230, 0.5), rgba(255, 255, 255, 0.15))',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.45), inset -4px -4px 8px rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.45)'
              }}
            ></div>

            {/* Golden music notes - kept as is */}
            <motion.div
              animate={{ rotate: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[20%] right-[25%] text-4xl opacity-40"
              style={{
                color: '#d4af37',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
              }}
            >
              ♪
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 0], y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[35%] left-[18%] text-3xl opacity-30"
              style={{
                color: '#d4af37',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
              }}
            >
              ♫
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 12, 0], y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[15%] right-[35%] text-2xl opacity-35"
              style={{
                color: '#d4af37',
                filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                textShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
              }}
            >
              ♪
            </motion.div>
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            {/* Decorative top flourish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div
                className="w-32 h-[2px] mx-auto mb-4"
                style={{
                  background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              ></div>
              <svg
                className="w-12 h-12 mx-auto"
                fill="#d4af37"
                viewBox="0 0 24 24"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))'
                }}
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
                className="text-5xl md:text-6xl font-bold mb-3 font-changa"
                style={{
                  background:
                    'linear-gradient(135deg, #d4af37 0%, #f4d03f 25%, #d4af37 50%, #c9a961 75%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
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

            {/* Decorative divider */}
            <div
              className="w-32 h-[2px] mx-auto mb-8"
              style={{
                background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
              }}
            ></div>

            {/* Date, Time, Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <p
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                style={{
                  textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
                }}
              >
                Saturday, April 11, 2026
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
                4:30 - 7:30 p.m.
              </p>
              <p
                className="text-xl font-bold text-white mb-1"
                style={{
                  textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
                }}
              >
                The Venue
              </p>
              <p className="text-gray-400">3650 17th Street, Sarasota, FL 34235</p>
            </motion.div>

            {/* Decorative bottom flourish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8"
            >
              <svg
                className="w-12 h-12 mx-auto"
                fill="#d4af37"
                viewBox="0 0 24 24"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))'
                }}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <div
                className="w-32 h-[2px] mx-auto mt-4"
                style={{
                  background: 'linear-gradient(to right, transparent, #d4af37, transparent)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              ></div>
            </motion.div>
          </div>
        </section>

        {/* TICKET OPTIONS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative"
        >
          {/* Background bubbles for tickets section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-[8%] w-20 h-20 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.4), rgba(135, 206, 250, 0.3))',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
              }}
            ></motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 right-[10%] w-24 h-24 rounded-full opacity-25"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.4), rgba(255, 182, 193, 0.3))',
                boxShadow: '0 0 35px rgba(186, 85, 211, 0.3)'
              }}
            ></motion.div>
          </div>

          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
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
                className="w-24 h-1 mx-auto rounded-full"
                style={{
                  background: 'linear-gradient(to right, #d4af37, #f4d03f, #d4af37)',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}
              ></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
            {tickets.map((ticket, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Golden glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 blur-2xl transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent)'
                  }}
                ></div>

                {/* Card with glass morphism */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col backdrop-blur-xl border border-white/20 group-hover:border-[#d4af37]/40 transition-all duration-300">
                  {/* Frosted glass background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                    }}
                  ></div>

                  {/* Top light reflection */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                  {/* Golden accent bar with glass effect */}
                  <div
                    className="relative h-1.5 z-10"
                    style={{
                      background:
                        'linear-gradient(to right, rgba(212, 175, 55, 0.6), rgba(244, 208, 63, 0.8), rgba(212, 175, 55, 0.6))',
                      boxShadow: '0 2px 15px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  ></div>

                  <div className="relative p-8 flex flex-col flex-grow z-10">
                    {/* Header */}
                    <div className="mb-8">
                      <h3
                        className="text-2xl font-bold mb-2 tracking-tight text-white/95"
                        style={{
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {ticket.tier}
                      </h3>
                      {ticket.halfTableNote && (
                        <p
                          className="text-sm text-white/70 italic mb-3"
                          style={{
                            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          {ticket.halfTableNote}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-5xl font-extrabold"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.4))'
                          }}
                        >
                          {ticket.price}
                        </span>
                      </div>
                    </div>

                    {/* Perks */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {ticket.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            fill="#d4af37"
                            viewBox="0 0 20 20"
                            style={{
                              filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.5))'
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
                            style={{
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
                            }}
                          >
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button with glass effect */}

                    <a
                      href="https://ci.ovationtix.com/35505/production/1252045?performanceId=11696147"
                      onClick={() => {
                        sendGAEvent('event', 'select_ticket_tier', {
                          tier_name: ticket.tier,
                          tier_price: ticket.price,
                          perks_count: ticket.perks.length,
                          perks_list: ticket.perks,
                          has_half_table_option: Boolean(ticket.halfTableNote),
                          gradient_style: ticket.gradient,
                          accent_style: ticket.accent,
                          source_page: 'golden_bubbles_bash_page',
                          ticket_url: 'https://ci.ovationtix.com/35505/production/1252045?performanceId=11696147',
                          user_scroll_depth: Math.round(
                            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
                          ),
                          time_on_page: Math.round((Date.now() - performance.timeOrigin) / 1000),
                          viewport_width: window.innerWidth,
                          viewport_height: window.innerHeight,
                          device_type:
                            window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
                          timestamp: new Date().toISOString()
                        })
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full px-4 py-4 rounded-2xl text-center font-bold text-white overflow-hidden group/btn backdrop-blur-sm"
                    >
                      {/* Glass button background */}
                      <div
                        className="absolute inset-0 transition-all duration-300 group-hover/btn:scale-[1.02]"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(212, 175, 55, 0.9), rgba(244, 208, 63, 0.95), rgba(201, 169, 97, 0.9))',
                          boxShadow:
                            '0 4px 20px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                        }}
                      ></div>

                      {/* Light shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                      {/* Top highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                      <span
                        className="relative font-semibold tracking-wide text-gray-900"
                        style={{
                          textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        Select {ticket.tier}
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="mt-20 text-center text-gray-500 text-sm border-t border-[#1a1a1a] pt-6">
          © {new Date().getFullYear()} The Pops Orchestra of Bradenton and Sarasota. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default BubbleBash
