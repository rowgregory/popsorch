'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, MapPin, Ticket, Info } from 'lucide-react'
import type { Concert, ConcertShow, Venue } from '@prisma/client'
import Picture from '../common/Picture'

type ConcertWithShows = Concert & {
  shows: (ConcertShow & { venue: Venue })[]
}

interface ConcertsBlockProps {
  concerts: ConcertWithShows[]
  pageData: any[]
}

function ConcertRow({ concert, index }: { concert: ConcertWithShows; index: number }) {
  const isLive = concert.status === 'LIVE'
  const sortedShows = [...concert.shows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const ticketHref = sortedShows[0]?.externalLink || concert.cueBoxExternalLink || null

  return (
    <motion.li
      key={concert.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group py-8 320:py-10 first:pt-0 border-b border-white/5 last:border-0"
    >
      <article
        aria-label={`${concert.name} concert`}
        className="grid grid-cols-1 990:grid-cols-12 gap-4 320:gap-6 items-start"
      >
        {/* ── Show Dates ── */}
        <div className="990:col-span-3 flex flex-col gap-3 320:gap-4">
          {sortedShows.length === 0 ? (
            <div className="flex flex-col">
              <p className="text-white/40 text-xs 320:text-sm font-lato">{concert.cardDate || 'Dates TBA'}</p>
            </div>
          ) : (
            sortedShows.map((show) => (
              <div key={show.id} className="flex flex-col gap-1">
                <time
                  dateTime={new Date(show.date).toISOString()}
                  className="font-changa text-white text-base 320:text-lg 430:text-xl leading-tight"
                >
                  {new Date(show.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-white/50 text-[10px] 320:text-xs flex items-center gap-1 font-lato">
                  <Clock className="w-3 h-3 shrink-0 text-blaze" aria-hidden="true" />
                  <span className="sr-only">Time:</span>
                  {new Date(show.date).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
                {show.venue?.name && (
                  <p className="text-white/50 text-[10px] 320:text-xs flex items-center gap-1 font-lato">
                    <MapPin className="w-3 h-3 shrink-0 text-blaze" aria-hidden="true" />
                    <span className="sr-only">Venue:</span>
                    {show.venue.name}
                  </p>
                )}
              </div>
            ))
          )}
          {sortedShows.length > 1 && (
            <p className="text-[9px] 320:text-[10px] text-blaze uppercase tracking-[0.2em] font-mono">
              {sortedShows.length} Shows
            </p>
          )}
        </div>

        {/* ── Image ── */}
        <div className="990:col-span-4 overflow-hidden">
          <Picture
            src={concert.imageUrl || '/images/banner-1.jpg'}
            alt={`${concert.name} promotional image`}
            className="w-full aspect-16/10 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={index === 0}
          />
        </div>

        {/* ── Info ── */}
        <div className="990:col-span-3 flex flex-col justify-center">
          {concert.type && (
            <span className="inline-flex items-center gap-1.5 text-[9px] 320:text-[10px] uppercase tracking-[0.2em] mb-2 320:mb-3 text-blaze font-mono">
              <div className="w-3 h-px bg-blaze" aria-hidden="true" />
              {concert.type}
            </span>
          )}
          <h3 className="font-changa font-bold text-white text-xl 320:text-2xl 760:text-3xl leading-tight mb-2 group-hover:text-blaze transition-colors duration-300">
            {concert.name}
          </h3>
          {concert.subtitle && (
            <p className="text-white/50 text-xs 320:text-sm mb-3 font-lato leading-relaxed">{concert.subtitle}</p>
          )}
          {isLive && (
            <span className="flex items-center gap-1.5 text-emerald-400 text-[9px] 320:text-[10px] uppercase tracking-[0.15em] font-mono mt-2">
              <Ticket className="w-3 h-3 320:w-3.5 320:h-3.5" aria-hidden="true" />
              <span className="sr-only">Status:</span>
              On Sale
            </span>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="990:col-span-2 flex flex-col gap-2 320:gap-3 w-full 990:w-auto 990:min-w-32">
          {isLive && ticketHref ? (
            <a
              href={ticketHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy tickets for ${concert.name}`}
              className="inline-flex items-center justify-center gap-2 px-4 320:px-6 py-2.5 320:py-3 bg-blaze hover:bg-blaze/90 text-white font-changa uppercase tracking-[0.15em] text-[10px] 320:text-xs transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full"
            >
              <Ticket className="w-3 h-3 320:w-3.5 320:h-3.5" aria-hidden="true" />
              Buy Tickets
            </a>
          ) : (
            <Link
              href={`/concerts/${concert.id}`}
              aria-label={`Get tickets for ${concert.name}`}
              className="inline-flex items-center justify-center gap-2 px-4 320:px-6 py-2.5 320:py-3 bg-blaze hover:bg-blaze/90 text-white font-changa uppercase tracking-[0.15em] text-[10px] 320:text-xs transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full"
            >
              <Ticket className="w-3 h-3 320:w-3.5 320:h-3.5" aria-hidden="true" />
              Get Tickets
            </Link>
          )}

          <Link
            href={`/concerts/${concert.id}`}
            aria-label={`View details for ${concert.name}`}
            className="inline-flex items-center justify-center gap-2 px-4 320:px-6 py-2.5 320:py-3 border border-white/20 hover:border-white/40 text-white font-changa uppercase tracking-[0.15em] text-[10px] 320:text-xs transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black w-full"
          >
            <Info className="w-3 h-3 320:w-3.5 320:h-3.5" aria-hidden="true" />
            Details
          </Link>
        </div>
      </article>
    </motion.li>
  )
}
export function ConcertsBlock({ concerts, pageData }: ConcertsBlockProps) {
  const live = concerts.filter((c) => c.status === 'LIVE')

  if (live.length === 0) return

  const concertData = pageData?.filter((p) => p?.id?.includes('concerts')) ?? []
  const concert = concertData.reduce<Record<string, string>>((acc, field) => {
    const key = field.id.replace('concerts_', '')
    acc[key] = field.value as string
    return acc
  }, {})

  const heading = concert.heading
  const subheading = concert.subheading

  return (
    <section aria-labelledby="concerts-block-heading" className="px-4 990:px-12 xl:px-4 pt-24 pb-32 bg-black">
      <div className="max-w-[320px] 430:max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-300 mx-auto w-full flex flex-col items-center">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-black/40 border border-white/10 backdrop-blur-sm">
            <span className="font-bold text-xs uppercase tracking-widest text-white text-center">{heading}</span>
          </div>
        </motion.div>

        <motion.h2
          id="concerts-block-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center text-4xl sm:text-5xl lg:text-6xl font-changa font-bold text-white max-w-3xl leading-tight mb-16 lg:mb-24"
        >
          {subheading}
        </motion.h2>

        {/* ── Concert List ── */}
        {live.length > 0 && (
          <ul role="list" className="flex flex-col divide-y divide-white/10 w-full mb-12">
            {live.map((concert, i) => (
              <ConcertRow key={concert.id} concert={concert} index={i} />
            ))}
          </ul>
        )}

        {/* ── Footer CTA ── */}
        {concerts.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/concerts"
              aria-label="View all upcoming concerts"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#da0032]"
              style={{ color: '#da0032' }}
            >
              <span>View All Concerts</span>
              <div
                className="h-px w-8 group-hover:w-12 transition-all duration-300"
                style={{ backgroundColor: '#da0032' }}
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
