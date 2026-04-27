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

  return (
    <motion.li
      key={concert.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group py-10 first:pt-0"
    >
      <article aria-label={`${concert.name} concert`} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── Show Dates ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {sortedShows.length === 0 ? (
            <div className="flex flex-col">
              <p className="text-white/40 text-sm">{concert.cardDate || 'Dates TBA'}</p>
            </div>
          ) : (
            sortedShows.map((show) => (
              <div key={show.id} className="flex flex-col gap-0.5">
                <time
                  dateTime={new Date(show.date).toISOString()}
                  className="font-changa text-white text-xl leading-tight"
                >
                  {new Date(show.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <p className="text-white/50 text-xs flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 shrink-0" aria-hidden="true" />
                  {new Date(show.date).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-white/50 text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                  {show.venue?.name ?? '—'}
                </p>
                {show.externalLink && isLive && (
                  <a
                    href={show.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-emerald-400 uppercase tracking-widest mt-1 w-fit hover:text-emerald-300 transition-colors focus-visible:outline-none"
                  >
                    <Ticket className="w-3 h-3 shrink-0" aria-hidden="true" />
                    Tickets
                  </a>
                )}
              </div>
            ))
          )}
          {sortedShows.length > 1 && (
            <p className="text-xs text-[#b5924c] uppercase tracking-widest">{sortedShows.length} shows</p>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="hidden lg:flex lg:col-span-1 self-stretch items-center justify-center">
          <div className="w-px h-full bg-white/10 mx-auto" aria-hidden="true" />
        </div>

        {/* ── Image ── */}
        <div className="lg:col-span-3 overflow-hidden">
          <Picture
            src={concert.imageUrl || '/images/banner-1.jpg'}
            alt={`${concert.name} promotional image`}
            className="w-full aspect-video lg:aspect-square object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={index === 0}
          />
        </div>

        {/* ── Info ── */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          {concert.type && (
            <span
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: '#da0032' }}
            >
              <div className="w-3 h-px bg-[#da0032]" aria-hidden="true" />
              {concert.type}
            </span>
          )}
          <h3 className="font-changa font-bold text-white text-2xl lg:text-3xl leading-tight mb-2 group-hover:text-blaze transition-colors duration-300">
            {concert.name}
          </h3>
          {concert.subtitle && <p className="text-white/50 text-sm mb-3">{concert.subtitle}</p>}
          <div className="w-8 h-0.5 mb-4" aria-hidden="true" />
          {isLive && (
            <span className="flex items-center gap-1.5 text-emerald-400 text-xs uppercase tracking-widest">
              <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
              Tickets On Sale
            </span>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="lg:col-span-2 flex flex-col gap-3 items-start lg:items-end justify-start pt-1">
          <Link
            href={`https://ci.ovationtix.com/35505/production/1232771?performanceId=11608139`}
            target="_blank"
            aria-label={`Buy tickets for ${concert.name}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white uppercase tracking-wider text-sm transition-colors duration-300 w-full lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap bg-blaze"
          >
            Buy Tickets
          </Link>

          <Link
            href={`/concerts/${concert.id}`}
            aria-label={`View details for ${concert.name}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white uppercase tracking-wider text-sm transition-colors duration-300 w-full lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap"
          >
            <Info className="w-4 h-4" aria-hidden="true" />
            Details
          </Link>
        </div>
      </article>
    </motion.li>
  )
}

export function ConcertsBlock({ concerts, pageData }: ConcertsBlockProps) {
  const live = concerts.filter((c) => c.status === 'LIVE')

  const concertData = pageData?.filter((p) => p?.id?.includes('concerts')) ?? []
  const concert = concertData.reduce<Record<string, string>>((acc, field) => {
    const key = field.id.replace('concerts_', '')
    acc[key] = field.value as string
    return acc
  }, {})

  const heading = concert.heading
  const subheading = concert.subheading

  return (
    <section aria-labelledby="concerts-block-heading" className="px-4 sm:px-10 lg:px-16 pt-24 pb-32 bg-black">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
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
        {live.length === 0 ? (
          <p className="text-white/40 text-sm">No concerts currently on sale.</p>
        ) : (
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
