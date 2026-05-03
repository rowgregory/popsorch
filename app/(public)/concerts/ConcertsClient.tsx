'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Music, Calendar, MapPin, Ticket, Clock } from 'lucide-react'
import type { ConcertStatus } from '@prisma/client'
import Picture from '../../components/common/Picture'
import { ConcertWithShows } from '@/app/types/entities/concert'

interface Props {
  concerts: ConcertWithShows[]
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const FILTERS: { label: string; value: ConcertStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'On Sale', value: 'LIVE' },
  { label: 'Archived', value: 'ARCHIVED' }
]

// ─── Concert Card ─────────────────────────────────────────────────────────────

export function ConcertCard({ concert, index }: { concert: ConcertWithShows; index: number }) {
  const isLive = concert.status === 'LIVE'
  const isArchived = concert.status === 'ARCHIVED'
  const sortedShows = [...concert.shows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const ticketHref = sortedShows[0]?.externalLink || concert.cueBoxExternalLink || null

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      aria-label={`${concert.name} concert`}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 ${isArchived ? 'opacity-60' : ''}`}
    >
      {/* Image */}
      <div className="lg:col-span-4 overflow-hidden">
        <Link
          href={`/concerts/${concert.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full h-56 sm:h-64 lg:h-full overflow-hidden"
        >
          <Picture
            src={concert.imageUrl || '/images/banner-1.jpg'}
            alt=""
            priority={index === 0}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="lg:col-span-5 bg-linear-to-b from-neutral-950 to-black p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div>
          {/* Type + status */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {concert.type && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-blaze" aria-hidden="true" />
                <span className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze-text">
                  {concert.type}
                </span>
              </div>
            )}
            {isLive && (
              <span
                role="status"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 font-changa text-[9px] text-emerald-400 uppercase tracking-widest"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                On Sale
              </span>
            )}
            {isArchived && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 font-changa text-[9px] text-white/50 uppercase tracking-widest">
                Archived
              </span>
            )}
            {concert.season && (
              <span className="font-changa text-[9px] uppercase tracking-widest text-white/40">
                {concert.season} Season
              </span>
            )}
          </div>

          {/* Name */}
          <Link
            href={`/concerts/${concert.id}`}
            className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze"
          >
            <h2 className="font-changa text-2xl sm:text-3xl text-white leading-tight group-hover:text-blaze-text transition-colors mb-2">
              {concert.name}
            </h2>
          </Link>

          {concert.subtitle && <p className="font-lato text-blaze-text/80 text-sm mb-4">{concert.subtitle}</p>}

          <div className="w-8 h-px bg-blaze mb-5" aria-hidden="true" />

          {/* Description */}
          {concert.description && (
            <p className="font-lato text-white/50 text-sm leading-relaxed line-clamp-3">{concert.description}</p>
          )}
        </div>

        {/* Card date */}
        {concert.cardDate && (
          <div className="flex items-center gap-2 text-white/60">
            <Calendar className="w-3.5 h-3.5 text-blaze-text shrink-0" aria-hidden="true" />
            <span className="font-lato text-xs uppercase tracking-wide">{concert.cardDate}</span>
          </div>
        )}
      </div>

      {/* Shows + CTA */}
      <div className="lg:col-span-3 bg-linear-to-t from-neutral-950 to-black p-6 sm:p-8 flex flex-col justify-between gap-6">
        {/* Show dates */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-px bg-blaze" aria-hidden="true" />
            <span className="font-changa text-[10px] uppercase tracking-[0.25em] text-blaze-text">
              {sortedShows.length === 1 ? 'Performance' : 'Performances'}
            </span>
          </div>

          {sortedShows.length === 0 ? (
            <p className="font-lato text-xs text-white/50">Dates TBA</p>
          ) : (
            sortedShows.map((show) => (
              <div key={show.id} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="w-3 h-3 text-blaze-text shrink-0" aria-hidden="true" />
                  <time dateTime={new Date(show.date).toISOString()} className="font-changa text-sm">
                    {new Date(show.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Clock className="w-3 h-3 text-blaze-text/60 shrink-0" aria-hidden="true" />
                  <span className="font-lato text-xs">
                    {new Date(show.date).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-3 h-3 text-blaze-text/60 shrink-0" aria-hidden="true" />
                  <span className="font-lato text-xs truncate">{show.venue.name}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2">
          <Link
            href={`/concerts/${concert.id}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-white/15 hover:border-blaze text-white/60 hover:text-white font-changa text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={`View details for ${concert.name}`}
          >
            View Details
          </Link>

          {isLive && ticketHref && (
            <a
              href={ticketHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy tickets for ${concert.name} (opens in new tab)`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blaze/90 hover:bg-blaze text-white font-changa text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Ticket className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              Buy Tickets
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
}

export default function ConcertsClient({ concerts }: Props) {
  const [filter, setFilter] = useState<ConcertStatus | 'ALL'>('ALL')

  const filtered = useMemo(() => {
    if (filter === 'ALL') return concerts
    return concerts.filter((c) => c.status === filter)
  }, [concerts, filter])

  // Group by season
  const bySeason = useMemo(() => {
    const map: Record<string, ConcertWithShows[]> = {}
    filtered.forEach((c) => {
      const key = c.season || 'Other'
      if (!map[key]) map[key] = []
      map[key].push(c)
    })
    return Object.entries(map).sort(([a], [b]) => b.localeCompare(a))
  }, [filtered])

  return (
    <main id="main-content" className="bg-black min-h-screen">
      {/* ── Page Header ── */}
      <header className="relative w-full text-center flex flex-col items-center pt-32 pb-20 border-b border-white/10 px-4">
        <p className="font-changa text-[10px] uppercase tracking-[0.3em] text-blaze-text mb-4">The Pops Orchestra</p>
        <div className="flex items-center gap-4 justify-center mb-4">
          <div className="w-10 sm:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
          <h1 className="font-changa text-4xl sm:text-5xl lg:text-6xl text-white leading-none">Concerts</h1>
          <div className="w-10 sm:w-16 h-px bg-blaze shrink-0" aria-hidden="true" />
        </div>
        <div className="w-16 h-px bg-blaze mx-auto mt-2 mb-6" aria-hidden="true" />
        <p className="font-lato text-white/50 text-sm sm:text-base max-w-xl leading-relaxed">
          Browse our upcoming season performances and find the perfect night out.
        </p>
      </header>

      <div className="px-4 sm:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* ── Filter tabs ── */}
          <div
            className="flex items-center gap-1 py-8 border-b border-white/10"
            role="tablist"
            aria-label="Filter concerts by status"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`px-5 py-2.5 font-changa text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                  filter === f.value
                    ? 'bg-blaze text-white'
                    : 'text-white/50 hover:text-white border border-white/10 hover:border-white/30'
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto font-lato text-xs text-white/40">
              {filtered.length} concert{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* ── Concert List ── */}
          <section aria-labelledby="concerts-list-heading" className="py-16 pb-32">
            <h2 id="concerts-list-heading" className="sr-only">
              All concerts — {filtered.length} total
            </h2>

            {filtered.length === 0 ? (
              <div role="status" className="text-center py-24">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="p-4 bg-white/5">
                    <Music className="w-8 h-8 text-white/40" aria-hidden="true" />
                  </div>
                  <h3 className="font-changa text-lg text-white">No concerts found</h3>
                  <p className="font-lato text-sm text-white/60 max-w-sm leading-relaxed">
                    Check back soon for upcoming performances.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                {bySeason.map(([season, seasonConcerts]) => (
                  <div key={season}>
                    {/* Season label */}
                    {bySeason.length > 1 && (
                      <div className="flex items-center gap-4 mb-8">
                        <span className="font-changa text-[10px] uppercase tracking-[0.3em] text-white/40">
                          {season === 'Other' ? 'Other' : `${season} Season`}
                        </span>
                        <div className="flex-1 h-px bg-white/10" aria-hidden="true" />
                        <span className="font-changa text-[9px] text-white/40">
                          {seasonConcerts.length} concert{seasonConcerts.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    <motion.ul
                      role="list"
                      aria-label={`${season} season concerts`}
                      className="flex flex-col gap-px bg-white/5"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={containerVariants}
                    >
                      {seasonConcerts.map((concert, i) => (
                        <li key={concert.id}>
                          <ConcertCard concert={concert} index={i} />
                        </li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
