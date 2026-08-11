import Picture from '@/app/components/common/Picture'
import { CueBoxEvent, CueBoxEventInstance } from '@/app/types/cuebox.types'
import { motion } from 'framer-motion'
import { Calendar, ExternalLink, MapPin } from 'lucide-react'

const STATUS_LABEL: Record<string, string> = {
  ON_SALE: 'On Sale',
  PRESALE: 'Presale',
  NOT_ON_SALE: 'Coming Soon',
  SOLD_OUT: 'Sold Out',
  CANCELED: 'Canceled'
}

const STATUS_COLOR: Record<string, string> = {
  ON_SALE: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  PRESALE: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  NOT_ON_SALE: 'text-white/40 border-white/10',
  SOLD_OUT: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  CANCELED: 'text-white/20 border-white/10'
}

function formatInstanceDate(startsAt: string) {
  const d = new Date(startsAt)
  return (
    d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  )
}

export function ConcertCard({
  event,
  instances,
  index,
  ref
}: {
  event: CueBoxEvent
  instances: CueBoxEventInstance[]
  index: number
  ref?: (node: HTMLElement | null) => void
}) {
  const hasImage = !!event.publicImageUrl
  const isOnSale = event.status === 'ON_SALE'

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      aria-label={event.name}
      className="scroll-mt-6 grid grid-cols-1 760:grid-cols-[320px_1fr] 990:grid-cols-[400px_1fr] border-b border-white/10 last:border-0"
    >
      {/* Square image */}
      {hasImage ? (
        <div className="relative aspect-square overflow-hidden">
          <Picture
            src={event.publicImageUrl}
            alt={event.name}
            fill
            priority={index < 2}
            className="object-cover object-center"
            sizes="(max-width: 760px) 100vw, (max-width: 1080px) 320px, 400px"
          />
          {/* Status badge over image */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-[9px] font-mono uppercase tracking-widest px-2 py-1 border backdrop-blur-sm bg-black/40 ${STATUS_COLOR[event.status] ?? 'text-white/40 border-white/10'}`}
            >
              {STATUS_LABEL[event.status] ?? event.status}
            </span>
          </div>
        </div>
      ) : (
        <div className="hidden 760:block aspect-square bg-white/2 border-r border-white/10" />
      )}

      {/* Content */}
      <div className="flex flex-col justify-between px-6 760:px-10 py-8 760:py-10 bg-black">
        <div className="flex flex-col gap-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-blaze shrink-0" aria-hidden="true" />
            <span className="font-changa text-[10px] uppercase tracking-[0.3em] text-white/30">2026–27 Season</span>
          </div>

          {/* Title */}
          <h2 className="font-changa font-black text-3xl 760:text-4xl 990:text-5xl text-white leading-[0.95]">
            {event.name}
          </h2>

          {/* Description */}
          {event.descriptionPlaintext && (
            <p className="font-lato text-base text-white/60 leading-relaxed max-w-lg">{event.descriptionPlaintext}</p>
          )}

          {/* Performances */}
          {instances.length > 0 && (
            <div className="flex flex-col gap-0 border-t border-white/10 pt-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-blaze shrink-0" aria-hidden="true" />
                <span className="font-changa text-[10px] uppercase tracking-[0.25em] text-white/30">Performances</span>
              </div>
              {instances.map((inst) => (
                <div
                  key={inst.id}
                  className="flex flex-col 480:flex-row 480:items-center gap-0.5 480:gap-4 py-2.5 border-b border-white/5 last:border-0"
                >
                  <span className="font-lato text-sm 760:text-base text-white leading-snug">
                    {formatInstanceDate(inst.startsAt)}
                  </span>
                  {inst.venue?.name && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <MapPin className="w-3 h-3 text-blaze shrink-0" aria-hidden="true" />
                      <span className="font-lato text-sm text-white/50">{inst.venue.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="pt-8">
          {isOnSale ? (
            <a
              href={event.publicTicketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buy tickets for ${event.name}`}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-blaze hover:bg-blazehover text-white font-changa text-sm uppercase tracking-widest transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Buy Tickets
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span
              className={`inline-flex text-[10px] font-changa uppercase tracking-[0.25em] px-3 py-1.5 border ${STATUS_COLOR[event.status] ?? 'text-white/20 border-white/5'}`}
            >
              {STATUS_LABEL[event.status] ?? 'Unavailable'}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
