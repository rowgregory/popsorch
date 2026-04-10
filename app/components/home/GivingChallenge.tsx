'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import Picture from '../common/Picture'

/* ─── Phase ──────────────────────────────────────────────────────────── */
const getPhase = (): 'promo' | 'thankyou' | 'hidden' => {
  return 'promo'
}

/* ─── Constants ──────────────────────────────────────────────────────── */
const GIVING_URL = 'https://www.givingchallenge.org/organizations/sarasota-pops-orchestra-inc'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─── Component ──────────────────────────────────────────────────────── */
export const GivingChallenge = () => {
  const reduced = useReducedMotion()
  const phase = getPhase()

  if (phase === 'hidden') return null

  const isThankyou = phase === 'thankyou'
  const image =
    'https://firebasestorage.googleapis.com/v0/b/the-pops-orchestra.firebasestorage.app/o/images%2FCymbals.png?alt=media&token=9f8e832f-0c4e-4718-9182-8ccbdf4341c5'

  const tx = (props: object) => (reduced ? { duration: 0 } : props)

  return (
    <section aria-labelledby="giving-challenge-heading" className="relative bg-black overflow-hidden">
      {/* ── Top accent ── */}
      <div className="w-full h-px bg-blaze" aria-hidden="true" />

      {/* ── Diagonal texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 60px)'
        }}
      />

      <div className="relative z-10 px-4 990:px-12 xl:px-4 py-24 990:py-32">
        <div className="max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl mx-auto">
          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 990:grid-cols-[1fr_auto] gap-16 990:gap-24 items-center">
            {/* ── Left — editorial text ── */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={tx({ duration: 0.5, ease })}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-px bg-blaze shrink-0" aria-hidden="true" />
                <span className="font-changa text-xs uppercase tracking-[0.3em] text-blaze">
                  {isThankyou ? 'Thank You' : 'April 13–16 · 2025'}
                </span>
              </motion.div>

              <motion.h2
                id="giving-challenge-heading"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={tx({ duration: 0.6, delay: 0.06, ease })}
                className="font-changa text-5xl 430:text-6xl 990:text-7xl text-white leading-[0.95] tracking-tight mb-8"
              >
                {isThankyou ? (
                  <>
                    Thank You
                    <br />
                    <span className="text-blaze">for Your</span>
                    <br />
                    Support
                  </>
                ) : (
                  <>
                    The
                    <br />
                    <span className="text-blaze">Giving</span>
                    <br />
                    Challenge
                  </>
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={tx({ duration: 0.5, delay: 0.12, ease })}
                className="font-lato text-white/60 text-sm 430:text-base leading-relaxed border-l-2 border-blaze pl-5 mb-10 max-w-lg"
              >
                {isThankyou
                  ? 'The Giving Challenge has come to a close. We are overwhelmed by the generosity of our community. Thank you to everyone who donated and supported The Pops Orchestra.'
                  : 'On April 15 & 16, our community comes together for a 24-hour day of giving. Support The Pops Orchestra and help us bring live music to Sarasota and Bradenton.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={tx({ duration: 0.45, delay: 0.18, ease })}
                className="flex flex-col xs:flex-row items-start gap-4"
              >
                {isThankyou ? (
                  <a
                    href="/donate"
                    className="group inline-flex items-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Continue Supporting Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <a
                      href={GIVING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Donate via The Giving Challenge — opens in new tab"
                      className="group inline-flex items-center gap-3 bg-blaze hover:bg-blazehover text-white px-8 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      Donate Now
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </a>
                    <a
                      href="/donate"
                      className="group inline-flex items-center gap-3 border border-white/20 hover:border-white/50 text-white/60 hover:text-white px-8 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                      Learn More
                    </a>
                  </>
                )}
              </motion.div>
            </div>

            {/* ── Right — single graphic ── */}
            {!isThankyou && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={tx({ duration: 0.45, delay: 0.1, ease })}
                className="relative w-full 990:w-105 aspect-video shrink-0"
              >
                {/* ── Corner brackets ── */}
                <span
                  className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blaze z-20"
                  aria-hidden="true"
                />
                <span
                  className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blaze z-20"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blaze z-20"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blaze z-20"
                  aria-hidden="true"
                />

                {/* ── Image ── */}
                <div className="absolute inset-0 bg-white/5 border border-white/10 overflow-hidden">
                  {image ? (
                    <>
                      <Picture src={image} alt="Giving Challenge 2026" className="w-full h-full object-cover" />
                      {/* subtle vignette */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 60%, rgba(0,0,0,0.2) 100%)'
                        }}
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Heart className="w-8 h-8 text-white/10" strokeWidth={1} aria-hidden="true" />
                      <p className="font-lato text-[10px] uppercase tracking-widest text-white/20">
                        Giving Challenge Graphic
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Stat badge — bottom left ── */}
                <div className="absolute bottom-5 right-5 z-20 flex items-center gap-3 bg-black/80 backdrop-blur-sm px-4 py-3 border-l-2 border-blaze">
                  <span className="font-changa text-2xl text-blaze leading-none">24 hrs</span>
                  <span className="font-lato text-white/70 text-xs uppercase tracking-widest">Day of giving</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Bottom stat strip — promo only ── */}
          {!isThankyou && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={tx({ duration: 0.5, delay: 0.25, ease })}
              className="mt-20 pt-8 border-t border-white/10 grid grid-cols-1 990:grid-cols-3 gap-0 divide-y 990:divide-y-0 990:divide-x divide-white/10"
            >
              {[
                { value: '24 hrs', label: 'Day of giving' },
                { value: 'Apr 15–16', label: 'Giving Challenge dates' },
                { value: '100%', label: 'Goes to The Pops' }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 py-5 990:py-6 990:px-8 first:990:pl-0 last:990:pr-0"
                >
                  <span className="font-changa text-2xl text-blaze leading-none shrink-0">{stat.value}</span>
                  <span className="font-lato text-white/50 text-xs uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Bottom accent ── */}
      <div className="w-full h-px bg-white/10" aria-hidden="true" />
    </section>
  )
}
