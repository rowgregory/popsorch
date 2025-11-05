'use client'
import { motion } from 'framer-motion'
import Picture from '../components/common/Picture'
import Link from 'next/link'

const tickets = [
  {
    tier: 'Ultimate',
    price: '$1,250',
    gradient: 'from-[#ff9000] to-[#da0032]',
    accent: 'shadow-[0_0_30px_#ff9000aa]',
    perks: [
      'VIP admission for 6 guests',
      'Valet parking',
      'On-stage round table seating',
      'Bottle of champagne for the table',
      'Raffle entries for each guest (necklace + dinner experience)'
    ]
  },
  {
    tier: 'Sponsor',
    price: '$1,050',
    gradient: 'from-[#da0032] to-[#ff9000]',
    accent: 'shadow-[0_0_25px_#da0032aa]',
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
      <section className="relative h-screen w-full overflow-hidden">
        <Picture
          src="/images/bubbles.png"
          alt="The Pops Orchestra 50th Anniversary Gala"
          priority
          className="object-contain object-center h-full w-full"
        />
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-10"
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
      <div className="max-w-5xl mx-auto px-6 py-20">
        <section className="relative py-24 overflow-hidden">
          {/* Animated iridescent bubbles background */}
          <div className="absolute inset-0">
            {/* Large bubbles */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-[15%] w-24 h-24 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.6), rgba(135, 206, 250, 0.5), rgba(186, 85, 211, 0.4))',
                boxShadow: '0 0 40px rgba(255, 182, 193, 0.4), inset -10px -10px 20px rgba(255, 255, 255, 0.3)'
              }}
            ></motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-32 right-[12%] w-32 h-32 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(135, 206, 250, 0.6), rgba(255, 215, 0, 0.5), rgba(186, 85, 211, 0.4))',
                boxShadow: '0 0 50px rgba(135, 206, 250, 0.4), inset -10px -10px 20px rgba(255, 255, 255, 0.3)'
              }}
            ></motion.div>

            <motion.div
              animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-20 left-[10%] w-28 h-28 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.6), rgba(255, 182, 193, 0.5), rgba(135, 206, 250, 0.4))',
                boxShadow: '0 0 45px rgba(255, 215, 0, 0.4), inset -10px -10px 20px rgba(255, 255, 255, 0.3)'
              }}
            ></motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-40 right-[20%] w-20 h-20 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.6), rgba(135, 206, 250, 0.5), rgba(255, 215, 0, 0.4))',
                boxShadow: '0 0 35px rgba(186, 85, 211, 0.4), inset -10px -10px 20px rgba(255, 255, 255, 0.3)'
              }}
            ></motion.div>

            {/* Small bubbles */}
            <motion.div
              animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[25%] left-[25%] w-12 h-12 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(135, 206, 250, 0.7), rgba(255, 215, 0, 0.5))',
                boxShadow: '0 0 20px rgba(135, 206, 250, 0.5), inset -5px -5px 10px rgba(255, 255, 255, 0.4)'
              }}
            ></motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[60%] right-[30%] w-10 h-10 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 182, 193, 0.7), rgba(186, 85, 211, 0.5))',
                boxShadow: '0 0 20px rgba(255, 182, 193, 0.5), inset -5px -5px 10px rgba(255, 255, 255, 0.4)'
              }}
            ></motion.div>

            <motion.div
              animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[30%] left-[35%] w-14 h-14 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.7), rgba(135, 206, 250, 0.5))',
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.5), inset -5px -5px 10px rgba(255, 255, 255, 0.4)'
              }}
            ></motion.div>

            {/* Tiny accent bubbles */}
            <div
              className="absolute top-[15%] right-[40%] w-6 h-6 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(135, 206, 250, 0.8), rgba(255, 215, 0, 0.6))',
                boxShadow: '0 0 15px rgba(135, 206, 250, 0.6)'
              }}
            ></div>
            <div
              className="absolute top-[45%] left-[20%] w-5 h-5 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.8), rgba(255, 182, 193, 0.6))',
                boxShadow: '0 0 12px rgba(186, 85, 211, 0.6)'
              }}
            ></div>
            <div
              className="absolute bottom-[25%] right-[15%] w-8 h-8 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.8), rgba(255, 182, 193, 0.6))',
                boxShadow: '0 0 18px rgba(255, 215, 0, 0.6)'
              }}
            ></div>

            {/* Golden music notes */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
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
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent)'
                  }}
                ></div>

                {/* Card */}
                <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0d0f10] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col group-hover:border-[#d4af37]/50 transition-colors duration-300">
                  {/* Golden accent bar */}
                  <div
                    className="h-1.5"
                    style={{
                      background: 'linear-gradient(to right, #d4af37, #f4d03f, #d4af37)',
                      boxShadow: '0 2px 10px rgba(212, 175, 55, 0.4)'
                    }}
                  ></div>

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-2 text-white tracking-tight" style={{ fontFamily: 'serif' }}>
                        {ticket.tier}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-5xl font-extrabold"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37, #f4d03f, #d4af37)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            filter: 'drop-shadow(0 2px 6px rgba(212, 175, 55, 0.3))'
                          }}
                        >
                          {ticket.price}
                        </span>
                      </div>
                    </div>

                    {/* Perks */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {ticket.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <svg
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            fill="#d4af37"
                            viewBox="0 0 20 20"
                            style={{
                              filter: 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.4))'
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm leading-relaxed">{perk}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}

                    <a
                      href="https://ci.ovationtix.com/35505/production/1252045?performanceId=11696147"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full px-6 py-4 rounded-xl text-center font-bold text-white overflow-hidden group/btn"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-300 group-hover/btn:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #d4af37, #f4d03f, #c9a961)',
                          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <span className="relative" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
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
