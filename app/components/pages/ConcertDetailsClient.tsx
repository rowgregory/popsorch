'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, ExternalLink, Music, Ticket } from 'lucide-react'
import type { Concert, ConcertShow, ConcertStatus, Venue } from '@prisma/client'
import Picture from '../common/Picture'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

type ConcertWithShows = Concert & {
  shows: (ConcertShow & { venue: Venue })[]
}

interface Props {
  concert: ConcertWithShows
}

function isNewConcert(createdAt: Date) {
  const diff = Date.now() - new Date(createdAt).getTime()
  return diff < 1000 * 60 * 60 * 24 * 30
}

export default function ConcertDetailsClient({ concert }: Props) {
  const isLive = concert?.status === ('LIVE' as ConcertStatus)

  if (concert.shows.length === 0) {
    return (
      <main id="main-content" className="bg-black min-h-screen flex flex-col items-center justify-center gap-4">
        <Music className="w-10 h-10 text-white/20" aria-hidden="true" />
        <p className="font-changa text-lg text-white/40">No event dates available at this time.</p>
        <Link
          href="/concerts"
          className="inline-flex items-center gap-2 font-changa text-xs uppercase tracking-widest text-blaze hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to Concerts
        </Link>
      </main>
    )
  }

  return (
    <main id="main-content" className="bg-black min-h-screen">
      {/* ── Hero ── */}
      <section aria-labelledby="concert-title" className="relative w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="relative w-full h-105 sm:h-140 lg:h-160"
        >
          {/* Blurred BG fill */}
          <Picture
            src={concert.imageUrl}
            priority
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-30"
          />

          {/* Red tint */}
          <div className="absolute inset-0 bg-blaze/5" aria-hidden="true" />

          {/* Sharp contained image */}
          <Picture
            src={concert.imageUrl}
            priority
            alt={`${concert.name} promotional image`}
            className="relative z-10 w-full h-full object-contain"
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-0 z-20 bg-linear-to-t from-black via-black/20 to-transparent"
            aria-hidden="true"
          />
        </motion.div>

        {/* Badges */}
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-10 z-30 flex flex-wrap items-center gap-3">
          {concert.type && (
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-blaze" aria-hidden="true" />
              <span className="font-changa text-[10px] uppercase tracking-[0.3em] text-blaze">{concert.type}</span>
            </div>
          )}
          {isLive && (
            <span
              role="status"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 font-changa text-[10px] text-emerald-400 uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Tickets Available
            </span>
          )}
          {isNewConcert(concert.createdAt) && (
            <span className="inline-flex items-center px-3 py-1.5 bg-sunburst/10 border border-sunburst/30 font-changa text-[10px] text-sunburst uppercase tracking-widest">
              New
            </span>
          )}
        </div>
      </section>

      <div className="px-4 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* ── Back link ── */}
          <div className="pt-8 pb-4">
            <Link
              href="/concerts"
              className="inline-flex items-center gap-2 font-changa text-[10px] uppercase tracking-[0.25em] text-white/30 hover:text-blaze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              All Concerts
            </Link>
          </div>

          {/* ── Title + Meta ── */}
          <section aria-labelledby="concert-title" className="py-12 sm:py-16 border-b border-white/10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <h1
                id="concert-title"
                className="font-changa text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-3"
              >
                {concert.name}
              </h1>
              {concert.subtitle && (
                <p className="font-changa text-xl sm:text-2xl text-blaze mb-6">{concert.subtitle}</p>
              )}
              <div className="w-16 h-px bg-blaze mb-6" aria-hidden="true" />

              {concert.pressRelease && (
                <p className="font-lato text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed border-l-2 border-blaze pl-5 max-w-3xl mb-8">
                  {concert.pressRelease}
                </p>
              )}

              {/* Quick meta */}
              <dl className="flex flex-wrap gap-x-6 gap-y-2">
                {concert.cardDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                    <dt className="sr-only">Date</dt>
                    <dd>
                      <time className="font-lato text-sm text-white/60 uppercase tracking-wide">
                        {concert.cardDate}
                      </time>
                    </dd>
                  </div>
                )}
                {concert.shows[0]?.venue?.name && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                    <dt className="sr-only">Primary venue</dt>
                    <dd className="font-lato text-sm text-white/60">{concert.shows[0].venue.name}</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          </section>

          {/* ── About ── */}
          {concert.description && (
            <section aria-labelledby="concert-about-heading" className="py-12 sm:py-16 border-b border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                    <span className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze">About</span>
                  </div>
                  <h2 id="concert-about-heading" className="font-changa text-3xl sm:text-4xl text-white leading-tight">
                    About This Concert
                  </h2>
                  <div className="w-8 h-px bg-blaze mt-4" aria-hidden="true" />
                </div>
                <div className="lg:col-span-8">
                  <p className="font-lato text-white/60 text-sm sm:text-base leading-relaxed border-l-2 border-blaze pl-5">
                    {concert.description}
                  </p>
                </div>
              </motion.div>
            </section>
          )}

          {/* ── Show Dates ── */}
          <section aria-labelledby="shows-heading" className="py-12 sm:py-16 pb-24 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center mb-16"
            >
              <p className="font-changa text-[10px] uppercase tracking-[0.3em] text-blaze mb-4">Schedule</p>
              <div className="flex items-center gap-4 justify-center mb-4">
                <div className="w-10 sm:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
                <h2 id="shows-heading" className="font-changa text-3xl sm:text-4xl text-white leading-none">
                  Show Dates
                </h2>
                <div className="w-10 sm:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
              </div>
              <p className="font-lato text-white/40 text-sm sm:text-base max-w-xl leading-relaxed mt-2">
                {concert.shows.length === 1
                  ? 'One performance available this season.'
                  : `${concert.shows.length} performances available this season.`}
              </p>
            </motion.div>

            {/* Show list */}
            <ul role="list" aria-label="All performances" className="flex flex-col gap-px bg-white/10">
              {concert.shows.map((show, i) => (
                <motion.li
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10"
                >
                  {/* Left — performance info */}
                  <div className="bg-linear-to-b from-black to-neutral-950 p-6 sm:p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                      <h3 className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze">
                        Performance {concert.shows.length > 1 ? i + 1 : ''}
                      </h3>
                    </div>

                    <dl className="flex flex-col divide-y divide-white/10">
                      <div className="flex items-center gap-3 py-4">
                        <Calendar className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                        <dt className="sr-only">Date</dt>
                        <dd>
                          <time dateTime={new Date(show.date).toISOString()} className="font-changa text-lg text-white">
                            {new Date(show.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </time>
                        </dd>
                      </div>

                      <div className="flex items-center gap-3 py-4">
                        <Clock className="w-4 h-4 text-blaze shrink-0" aria-hidden="true" />
                        <dt className="sr-only">Time</dt>
                        <dd className="font-lato text-sm text-white/60">
                          {new Date(show.date).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </dd>
                      </div>

                      <div className="flex items-start gap-3 py-4">
                        <MapPin className="w-4 h-4 text-blaze shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <dt className="sr-only">Venue</dt>
                          <dd className="font-lato text-sm text-white/80">{show.venue.name}</dd>
                          {show.venue.address && (
                            <dd className="font-lato text-xs text-white/40 mt-0.5">{show.venue.address}</dd>
                          )}
                          {show.venue.city && (
                            <dd className="font-lato text-xs text-white/40 mt-0.5">{show.venue.city}</dd>
                          )}
                        </div>
                      </div>
                    </dl>
                  </div>

                  {/* Right — venue + CTA */}
                  <div className="bg-linear-to-t from-black to-neutral-950 p-6 sm:p-8 lg:p-10 flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-6 h-px bg-blaze" aria-hidden="true" />
                      <h3 className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze">Venue</h3>
                    </div>

                    <h4 className="font-changa text-2xl sm:text-3xl text-white mb-2 leading-tight">
                      {show.venue.name}
                    </h4>
                    <div className="w-8 h-px bg-blaze mb-4" aria-hidden="true" />

                    {show.venue.address && (
                      <address className="not-italic font-lato text-sm text-white/40 leading-relaxed mb-2">
                        {show.venue.address}
                      </address>
                    )}

                    {show.venue.address && (
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(show.venue.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${show.venue.name} (opens in new tab)`}
                        className="inline-flex items-center gap-2 font-lato text-xs text-white/30 hover:text-blaze transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze w-fit"
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        Get Directions
                      </a>
                    )}

                    {/* Venue capacity / accessibility */}
                    {(show.venue.capacity || show.venue.accessibility) && (
                      <div className="space-y-2 mb-10">
                        {show.venue.capacity && (
                          <p className="font-lato text-xs text-white/30">Capacity: {show.venue.capacity}</p>
                        )}
                        {show.venue.accessibility && (
                          <p className="font-lato text-xs text-white/30 leading-relaxed line-clamp-2">
                            {show.venue.accessibility}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      {!isLive ? (
                        <div
                          role="status"
                          className="inline-flex items-center px-6 py-4 border border-white/10 font-changa text-sm uppercase tracking-widest text-white/20"
                        >
                          Not Yet On Sale
                        </div>
                      ) : show.externalLink ? (
                        <a
                          href={show.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buy tickets for ${concert.name} on ${new Date(show.date).toLocaleDateString()} (opens in new tab)`}
                          className="inline-flex items-center justify-center gap-2 border border-blaze bg-blaze/90 hover:bg-blaze text-white px-6 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          <Ticket className="w-4 h-4 shrink-0" aria-hidden="true" />
                          Buy Tickets
                        </a>
                      ) : concert.cueBoxExternalLink ? (
                        <a
                          href={concert.cueBoxExternalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Buy tickets for ${concert.name} (opens in new tab)`}
                          className="inline-flex items-center justify-center gap-2 border border-blaze bg-blaze/90 hover:bg-blaze text-white px-6 py-4 font-changa text-sm uppercase tracking-widest transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                          Buy Tickets
                        </a>
                      ) : (
                        <div
                          role="status"
                          className="inline-flex items-center px-6 py-4 border border-white/10 font-changa text-sm uppercase tracking-widest text-white/20"
                        >
                          Tickets Coming Soon
                        </div>
                      )}
                      <CallBoxOfficeBtn />
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
