import { updateConcertStatus } from '@/app/lib/actions/concert/updateConcertStatus'
import { motion } from 'framer-motion'
import { Archive, ArrowRight, CheckCircle, Clock, Info, KeyRound, Music2, Plug, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function CenterColumn({ concerts }) {
  const router = useRouter()
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.12 }}
      className="flex-1 flex flex-col overflow-hidden border-r border-border-dark"
    >
      {/* Concerts header — sticky within column */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-dark bg-bg-dark">
        <div className="flex items-center gap-2">
          <Music2 className="w-3.5 h-3.5 text-primary-dark" />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">Concerts</span>
          <span className="text-[9px] font-mono text-muted-dark/40">({concerts.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://app.getcuebox.com"
            target="_blank"
            className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
            title="View all concerts"
          >
            View All
          </Link>
          <Link
            href="https://app.getcuebox.com"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors"
          >
            <Plus className="w-2.5 h-2.5" />
            New Concert
          </Link>
        </div>
      </div>

      {/* CueBox migration notice */}
      <div className="shrink-0 flex items-start gap-2.5 px-4 py-3 border-b border-border-dark bg-surface-dark/50">
        <Info className="w-3 h-3 text-primary-dark shrink-0 mt-0.5" />
        <p className="text-[9px] font-mono text-muted-dark/60 leading-relaxed">
          1 remaining concert was created here. All new concerts should be created in{' '}
          <Link
            href="https://app.getcuebox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark hover:text-secondary-light transition-colors underline underline-offset-2"
          >
            CueBox
          </Link>{' '}
          going forward and will sync here via the external API.
        </p>
      </div>

      {/* Concerts list — scrollable */}
      <div className="flex-1 overflow-y-auto">
        {concerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Music2 className="w-10 h-10 text-border-dark" />
            <p className="text-muted-dark text-sm">No concerts yet.</p>
            <Link
              href="https://app.getcuebox.com"
              target="_blank"
              className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add your first concert
            </Link>
          </div>
        ) : (
          concerts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.13 + i * 0.04 }}
              className="flex items-center border-b border-border-dark/40 last:border-0 group"
            >
              <Link
                href={`/v2/concerts/${c.id}/edit`}
                className="flex items-center justify-between gap-4 px-4 py-3.5 flex-1 min-w-0 hover:bg-surface-dark transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-text-dark text-sm font-medium truncate">{c.name}</p>
                    {c.type && (
                      <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-muted-dark/50 border border-border-dark px-1.5 py-0.5 hidden sm:block">
                        {c.type}
                      </span>
                    )}
                  </div>
                  {c.cardDate && <p className="text-muted-dark text-[10px] mt-0.5 font-mono">{c.cardDate}</p>}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {c.status === 'LIVE' ? (
                    <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      <span className="hidden sm:block">Live</span>
                    </span>
                  ) : c.status === 'ARCHIVED' ? (
                    <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-muted-dark/40">
                      <Archive className="w-3 h-3" />
                      <span className="hidden sm:block">Archived</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-mono uppercase text-yellow-400">
                      <Clock className="w-3 h-3" />
                      <span className="hidden sm:block">Draft</span>
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-border-dark group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>

              {/* Draft */}
              <button
                onClick={async () => {
                  const res = await updateConcertStatus(c.id, 'DRAFT')
                  if (res.success) router.refresh()
                }}
                disabled={c.status === 'DRAFT'}
                className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-yellow-400 hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                aria-label={c.status === 'DRAFT' ? 'Already a draft' : `Set ${c.name} to draft`}
                title={c.status === 'DRAFT' ? 'Already Draft' : 'Set to Draft'}
              >
                <Clock className="w-3.5 h-3.5" />
              </button>

              {/* Live */}
              <button
                onClick={async () => {
                  const res = await updateConcertStatus(c.id, 'LIVE')
                  if (res.success) router.refresh()
                }}
                disabled={c.status === 'LIVE'}
                className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-emerald-400 hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                aria-label={c.status === 'LIVE' ? 'Already live' : `Set ${c.name} to live`}
                title={c.status === 'LIVE' ? 'Already Live' : 'Set to Live'}
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </button>

              {/* Archive */}
              <button
                onClick={async () => {
                  const res = await updateConcertStatus(c.id, 'ARCHIVED')
                  if (res.success) router.refresh()
                }}
                disabled={c.status === 'ARCHIVED'}
                className="shrink-0 px-3 py-3.5 text-muted-dark/30 hover:text-muted-dark hover:bg-surface-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-muted-dark/30 disabled:hover:bg-transparent"
                aria-label={c.status === 'ARCHIVED' ? 'Already archived' : `Archive ${c.name}`}
                title={c.status === 'ARCHIVED' ? 'Already Archived' : 'Archive'}
              >
                <Archive className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* ── CueBox API Endpoints ── */}
      <div className="shrink-0 border-t border-border-dark">
        {/* Section header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-dark bg-bg-dark">
          <div className="flex items-center gap-2">
            <Plug className="w-3.5 h-3.5 text-primary-dark" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-dark">CueBox API</span>
            <span className="text-[9px] font-mono text-muted-dark/40">api.getcuebox.com/external/v1</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[9px] font-mono text-muted-dark/40">
              <KeyRound className="w-2.5 h-2.5" />
              BearerAuth
            </span>

            <a
              href="https://docs.getcuebox.com/docs/external/cuebox-external-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark hover:text-text-dark transition-colors"
            >
              Docs ↗
            </a>
          </div>
        </div>

        {/* Endpoint rows */}
        <div className="max-h-44 overflow-y-auto divide-y divide-border-dark/40">
          {[
            {
              method: 'GET',
              path: '/events',
              label: 'List events',
              note: 'Filter by instanceDatetimeStartFrom / instanceDatetimeStartTo (max 2yr range)',
              href: 'https://docs.getcuebox.com/docs/external/cuebox-external-service-list-events'
            },
            {
              method: 'GET',
              path: '/events/:id',
              label: 'Get an event by ID',
              note: 'Requires id path param — ID of the event to retrieve',
              href: 'https://docs.getcuebox.com/docs/external/cuebox-external-service-get-event'
            },
            {
              method: 'GET',
              path: '/events/:id/instances',
              label: 'List event instances by event ID',
              note: 'Requires eventId path param — filters instances to that event',
              href: 'https://docs.getcuebox.com/docs/external/cuebox-external-service-list-event-instances-for-event'
            },
            {
              method: 'GET',
              path: '/event-instances',
              label: 'List event instances',
              note: 'Filter by startsAtFrom / startsAtTo (max 2yr range, default 1yr window)',
              href: 'https://docs.getcuebox.com/docs/external/cuebox-external-service-list-event-instances'
            },
            {
              method: 'GET',
              path: '/event-instances/:id',
              label: 'Get an event instance by ID',
              note: 'Requires id path param — unique identifier for the event instance',
              href: 'https://docs.getcuebox.com/docs/external/cuebox-external-service-get-event-instance'
            }
          ].map(({ method, path, label, note, href }) => (
            <a
              key={`${method}-${path}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-dark transition-colors group"
            >
              {/* Method badge */}
              <span className="text-[8px] font-mono tracking-[0.12em] uppercase w-8 shrink-0 text-emerald-400 mt-0.5">
                {method}
              </span>

              {/* Path + note stacked */}
              <div className="flex-1 min-w-0">
                <code className="text-[10px] font-mono text-muted-dark/60 group-hover:text-text-dark transition-colors block truncate">
                  {path}
                </code>
                {note && <span className="text-[9px] font-mono text-muted-dark/30 mt-0.5 block truncate">{note}</span>}
              </div>

              {/* Label */}
              <span className="text-[9px] font-mono text-muted-dark/40 shrink-0 hidden sm:block truncate max-w-40 mt-0.5">
                {label}
              </span>

              <ArrowRight className="w-3 h-3 text-border-dark group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>
    </motion.main>
  )
}
