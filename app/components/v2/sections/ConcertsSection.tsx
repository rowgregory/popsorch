'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import type { Concert, ConcertShow, Venue } from '@prisma/client'
import Picture from '../../common/Picture'

type ConcertWithShows = Concert & {
  shows: (ConcertShow & { venue: Venue })[]
}

interface ConcertsSectionProps {
  concerts: ConcertWithShows[] | null
  backgroundImage?: string
}

function ConcertCard({ concert, index }: { concert: ConcertWithShows; index: number }) {
  const firstShow = concert.shows?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white p-10 flex flex-col"
    >
      {/* Concert type badge */}
      {concert.type === 'ADD_ON' && (
        <span className="font-heebo text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: '#da0032' }}>
          Add-On Show
        </span>
      )}

      {/* Name */}
      <h3 className="font-c-infant font-bold text-xl sm:text-2xl uppercase tracking-wide text-neutral-900 leading-tight mb-4">
        {concert.name}
      </h3>

      {/* Description */}
      <p className="font-heebo text-neutral-500 text-sm leading-relaxed mb-6">
        {concert.description
          ? concert.description.slice(0, 120) + (concert.description.length > 120 ? '...' : '')
          : 'An unforgettable evening of world-class music performed by The Pops Orchestra of Bradenton and Sarasota.'}
      </p>

      {/* Metadata */}
      <div className="space-y-2 mb-auto">
        {firstShow?.venue?.name && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-blaze" aria-hidden="true" />
            <span className="font-heebo text-sm text-neutral-500">{firstShow.venue.name}</span>
          </div>
        )}
        {!firstShow && concert.cardDate && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0 text-blaze" aria-hidden="true" />
            <span className="font-heebo text-sm text-neutral-500">{concert.cardDate}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/concerts/${concert.id}`}
        aria-label={`Buy tickets for ${concert.name}`}
        className="inline-flex items-center gap-3 px-8 py-4 mt-8 bg-neutral-900 hover:bg-neutral-700 text-white font-heebo text-xs tracking-[0.2em] uppercase transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        Buy Ticket
      </Link>
    </motion.div>
  )
}

export function ConcertsSection({ concerts, backgroundImage }: ConcertsSectionProps) {
  const live = concerts?.filter((c) => c.status === 'LIVE').slice(0, 5) ?? []

  return (
    <section
      className="relative bg-neutral-950 py-24 sm:py-37.5 px-6 xl:px-16 overflow-hidden"
      aria-labelledby="concerts-section-heading"
    >
      {/* Background image */}
      {backgroundImage && (
        <Picture
          priority
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
        />
      )}

      <div className="relative z-10 max-w-285 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-transparent lg:gap-0">
          {/* ── Cell 1 — Label / Intro ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2
              id="concerts-section-heading"
              className="font-c-infant font-bold text-5xl lg:text-6xl uppercase leading-none mb-6 text-blaze"
            >
              The Tour
            </h2>
            <p className="font-heebo text-neutral-400 text-sm leading-relaxed mb-10 max-w-xs">
              Six unforgettable nights of music, plus two special add-on shows you won&apos;t want to miss this season.
            </p>
            <Link
              href="/concerts"
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-heebo text-xs tracking-[0.2em] uppercase transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 bg-blaze"
            >
              Look More
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* ── Cells 2–6 — Concert cards in a 2-col sub-grid ── */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {live.length > 0
              ? live.map((concert, i) => <ConcertCard key={concert.id} concert={concert} index={i} />)
              : // Placeholder skeleton cards
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/5 p-8 h-72 animate-pulse" aria-hidden="true" />
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
