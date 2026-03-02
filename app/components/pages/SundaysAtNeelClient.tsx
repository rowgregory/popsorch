'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IConcert } from '@/app/types/entities/concert'
import { ArrowRightIcon, Clock, Info, MapPin, Ticket } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import CallBoxOfficeBtn from '@/app/components/common/CallBoxOfficeBtn'

export const SundaysAtNeelClient = ({ concerts, data }) => {
  const field = (id: string) => data?.content?.find((item) => item.id === id)?.value ?? ''
  const sectionRef = useRef<HTMLDivElement>(null)
  const concert = concerts?.[0] as IConcert | undefined

  return (
    <main id="main-content" className="min-h-dvh bg-[#111419] text-white">
      <div
        className="bg-grain bg-repeat bg-center w-[300%] h-[300%] opacity-10 -left-1/2 top-[-110%] fixed animate-grain"
        style={{ backfaceVisibility: 'hidden', willChange: 'transform' }}
        aria-hidden="true"
      />

      <div className="p-8 relative z-10">
        <Link
          href="/"
          aria-label="Return to The Pops Orchestra home page"
          className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111419] rounded-md"
        >
          <div
            className="bg-golden50Logo bg-no-repeat bg-contain bg-center w-20 h-20"
            role="img"
            aria-label="The Pops Orchestra logo"
          />
        </Link>
      </div>

      {/* Hero */}
      <section
        id="home"
        aria-labelledby="sundays-hero-heading"
        className="relative flex justify-center overflow-hidden"
      >
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-24">
          <motion.h1
            id="sundays-hero-heading"
            className="font-changa text-5xl md:text-[112px] font-bold mb-6 text-white drop-shadow-2xl uppercase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {field('sundays_hero_heading').split('@')[0]}@
            <span className="bg-linear-to-r from-blaze to-sunburst bg-clip-text text-transparent">
              {field('sundays_hero_heading').split('@')[1]}
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Concert Section */}
      <section aria-labelledby="sundays-concert-heading" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16 flex items-center flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 id="sundays-concert-heading" className="font-changa text-3xl text-white mb-2">
              {field('sundays_page_title')}
            </h2>
            <div className="w-12 h-0.5 bg-blaze mx-auto mb-6" aria-hidden="true" />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">{field('sundays_page_subtitle')}</p>
          </motion.div>

          {/* Concert row */}
          <div ref={sectionRef} className="relative z-50">
            {concert ? (
              <motion.article
                aria-label={`${concert.name} concert`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group w-full border-t border-white/10 pt-10"
              >
                <div className="grid grid-cols-1 990:grid-cols-12 gap-8 items-start">
                  {/* Date column */}
                  <div className="990:col-span-2 flex flex-col gap-2">
                    {concert.eventDetails?.[0] && (
                      <>
                        <p className="font-changa text-blaze text-xs uppercase tracking-widest mb-0.5">
                          {concert.eventDetails[0].dayOfWeek}
                        </p>
                        <time
                          dateTime={concert.eventDetails[0].date}
                          className="font-changa text-white text-xl leading-tight"
                        >
                          {concert.eventDetails[0].date}
                        </time>
                        <p className="font-lato text-white/50 text-xs mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {concert.eventDetails[0].time}
                        </p>
                        <p className="font-lato text-white/50 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {concert.eventDetails[0].city}
                        </p>
                        {concert.eventDetails[0].isOnSale ? (
                          <span className="flex items-center gap-1 font-lato text-xs text-green-400 font-semibold uppercase tracking-widest mt-1">
                            <Ticket className="w-3 h-3 shrink-0" aria-hidden="true" />
                            On Sale
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-lato text-xs text-white/30 font-semibold uppercase tracking-widest mt-1 line-through decoration-white/20">
                            <Ticket className="w-3 h-3 shrink-0" aria-hidden="true" />
                            Sold Out
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div
                    className="hidden 990:flex 990:col-span-1 self-stretch items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-px h-full bg-white/10 mx-auto" />
                  </div>

                  {/* Image */}
                  <div className="990:col-span-4 overflow-hidden">
                    <Picture
                      src={concert.imageUrl ?? '/images/banner-1.jpg'}
                      alt={`${concert.name} promotional image`}
                      className="w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={true}
                    />
                  </div>

                  {/* Info + CTA */}
                  <div className="990:col-span-5 flex flex-col justify-start gap-4">
                    {concert.type && (
                      <span className="inline-flex items-center gap-1.5 font-changa text-xs uppercase tracking-[0.25em] text-blaze">
                        <div className="w-3 h-px bg-blaze" aria-hidden="true" />
                        {concert.type}
                      </span>
                    )}
                    <h3 className="font-changa text-white text-2xl 990:text-4xl leading-tight group-hover:text-sunburst transition-colors duration-300">
                      {concert.name}
                    </h3>
                    <div className="w-8 h-px bg-blaze" aria-hidden="true" />
                    {concert.description && (
                      <p className="font-lato text-white/60 text-sm leading-relaxed">{concert.description}</p>
                    )}
                    <div className="flex flex-col gap-3 mt-2">
                      {concert.isOnSale ? (
                        <Link
                          href={`/concerts/${concert.id}`}
                          aria-label={`Buy tickets for ${concert.name}`}
                          className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blaze hover:bg-blazehover text-white font-changa uppercase tracking-widest text-sm transition-colors duration-300 w-full 990:w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111419]"
                        >
                          <span>Buy Tickets</span>
                          <ArrowRightIcon
                            className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <CallBoxOfficeBtn />
                          <Link
                            href={`/concerts/${concert.id}`}
                            aria-label={`View details for ${concert.name}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-changa uppercase tracking-widest text-sm transition-colors duration-300 w-full 990:w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111419]"
                          >
                            <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>Details</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ) : (
              <p className="font-lato text-white/50 text-center text-sm">No upcoming concerts at this time.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
