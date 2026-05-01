'use client'

import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Calendar, Tag } from 'lucide-react'
import Picture from '@/app/components/common/Picture'
import { CueBoxEvent } from '@/app/types/cuebox.types'
import { mockCueBoxEvents } from '@/app/lib/mock/mockCueBoxEvents'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function statusLabel(status: CueBoxEvent['status']) {
  switch (status) {
    case 'ON_SALE':
      return { label: 'On Sale', cls: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' }
    case 'SOLD_OUT':
      return { label: 'Sold Out', cls: 'bg-red-500/10 text-red-400 border border-red-500/20' }
    case 'CANCELLED':
      return { label: 'Cancelled', cls: 'bg-border-dark text-muted-dark border border-border-dark' }
    case 'OFF_SALE':
      return { label: 'Off Sale', cls: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' }
  }
}

function formatDateRange(first: string, last: string) {
  const f = new Date(first)
  const l = new Date(last)
  const same = f.toDateString() === l.toDateString()
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }
  return same
    ? f.toLocaleDateString('en-US', { ...opts, year: 'numeric' })
    : `${f.toLocaleDateString('en-US', opts)} – ${l.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`
}

// ── Featured (first) concert ──────────────────────────────────────────────────
function FeaturedConcert({ event }: { event: CueBoxEvent }) {
  const { label, cls } = statusLabel(event.status)
  const dateRange = formatDateRange(event.firstInstanceDatetime, event.lastInstanceDatetime)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-[70vh] min-h-125 overflow-hidden group mb-px"
    >
      {/* Full-bleed image */}
      <Picture
        priority
        src={event.publicImageUrl}
        alt={event.name}
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-bg-dark via-bg-dark/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-bg-dark/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          {event.type === 'ADD_ON' && (
            <span className="text-[8px] font-mono tracking-[0.2em] uppercase px-2 py-1 border border-primary-dark/40 text-primary-dark">
              Add-On Show
            </span>
          )}
          <span className={`text-[8px] font-mono tracking-[0.2em] uppercase px-2 py-1 ${cls}`}>{label}</span>
        </div>

        {event.subtitle && (
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-primary-dark mb-2">{event.subtitle}</p>
        )}

        <h2 className="font-quicksand font-black text-4xl sm:text-5xl lg:text-6xl text-text-dark leading-none mb-4">
          {event.name}
        </h2>

        {event.description && (
          <p className="text-sm text-muted-dark leading-relaxed mb-6 max-w-xl line-clamp-3">{event.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-mono text-muted-dark/60">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {dateRange}
          </span>
          {event.venues[0] && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {event.venues[0].name}
            </span>
          )}
        </div>

        {event.status === 'ON_SALE' ? (
          <a
            href={event.publicTicketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.2em] uppercase transition-colors self-start"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Get Tickets
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-8 py-3 border border-border-dark text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark/40 self-start">
            {label}
          </div>
        )}
      </div>

      {/* Season label — top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
        <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-muted-dark/40">25–26 Season</span>
      </div>
    </motion.div>
  )
}

// ── Horizontal scroll row concert card ───────────────────────────────────────
function ConcertRow({ event, index }: { event: CueBoxEvent; index: number }) {
  const { label, cls } = statusLabel(event.status)
  const dateRange = formatDateRange(event.firstInstanceDatetime, event.lastInstanceDatetime)
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className={`flex flex-col sm:flex-row ${isEven ? '' : 'sm:flex-row-reverse'} border-b border-border-dark group`}
    >
      {/* Image */}
      <div className="relative sm:w-2/5 h-56 sm:h-72 overflow-hidden shrink-0">
        <Picture
          src={event.publicImageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent to-bg-dark/60`} />

        {/* Type badge overlay */}
        {event.type === 'ADD_ON' && (
          <div className="absolute top-4 left-4">
            <span className="text-[7px] font-mono tracking-[0.2em] uppercase px-2 py-1 bg-bg-dark/80 border border-primary-dark/40 text-primary-dark">
              Add-On
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center flex-1 px-8 py-8 ${isEven ? 'sm:pl-10' : 'sm:pr-10'}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[7px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 ${cls}`}>{label}</span>
        </div>

        {event.subtitle && (
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-primary-dark mb-2">{event.subtitle}</p>
        )}

        <h2 className="font-quicksand font-black text-2xl sm:text-3xl text-text-dark leading-tight mb-3">
          {event.name}
        </h2>

        {event.description && (
          <p className="text-xs text-muted-dark/70 leading-relaxed mb-5 line-clamp-3 max-w-lg">{event.description}</p>
        )}

        <div className="flex flex-col gap-1.5 mb-5 text-[9px] font-mono text-muted-dark/50">
          <span className="flex items-center gap-2">
            <Calendar className="w-3 h-3 shrink-0" />
            {dateRange}
          </span>
          <div className="flex flex-col gap-0.5 pl-5">
            {event.venues.map((v) => (
              <span key={v.name} className="flex items-center gap-2 text-muted-dark/40">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                {v.name}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-6">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="text-[7px] font-mono tracking-widest uppercase px-1.5 py-0.5 border border-border-dark text-muted-dark/30 flex items-center gap-1"
            >
              <Tag className="w-2 h-2" />
              {tag}
            </span>
          ))}
        </div>

        {event.status === 'ON_SALE' ? (
          <a
            href={event.publicTicketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.2em] uppercase transition-colors self-start"
          >
            <ExternalLink className="w-3 h-3" />
            Get Tickets
          </a>
        ) : (
          <div className="inline-flex px-6 py-2.5 border border-border-dark text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark/40 self-start">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ConcertsTestPage() {
  const session = useSession()
  const userRole = session.data.user.role
  if (userRole !== 'ADMIN' && userRole !== 'CONDUCTOR' && userRole !== 'SUPER_USER') return

  const [featured, ...rest] = mockCueBoxEvents

  return (
    <div className="min-h-screen bg-bg-dark text-text-dark">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 sm:px-12 lg:px-16 py-6 border-b border-border-dark"
      >
        <div className="flex items-center gap-4">
          <div className="w-px h-6 bg-primary-dark" />
          <div>
            <p className="text-[8px] font-mono tracking-[0.3em] uppercase text-primary-dark">The Pops Orchestra</p>
            <h1 className="font-quicksand font-black text-lg text-text-dark leading-none mt-0.5">26–27 Season</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-dark/40">
            {mockCueBoxEvents.length} Concerts
          </span>
          <div className="w-px h-4 bg-border-dark" />
          <Link
            href="/v2/dashboard"
            className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/"
            className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
          >
            Home
          </Link>
        </div>
      </motion.div>

      {/* Featured */}
      <FeaturedConcert event={featured} />

      {/* Alternating rows */}
      <div>
        {rest.map((event, i) => (
          <ConcertRow key={event.id} event={event} index={i} />
        ))}
      </div>
    </div>
  )
}
