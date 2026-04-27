// app/(authenticated)/v2/concerts/ConcertsPageClient.tsx
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Music2, Plus, ChevronRight, CheckCircle, Clock, Archive } from 'lucide-react'
import Link from 'next/link'
import { Concert, ConcertStatus } from '@prisma/client'
import Picture from '../../common/Picture'
import { SeasonGroup as ISeasonGroup } from '@/app/types/entities/concert'
import { LogoutButton } from '../common/LogoutButton'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  concerts: Concert[]
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_COLS: {
  status: ConcertStatus
  label: string
  color: string
  bg: string
  icon: React.ReactNode
}[] = [
  {
    status: 'LIVE',
    label: 'Live',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
    icon: <CheckCircle className="w-3 h-3" />
  },
  {
    status: 'DRAFT',
    label: 'Draft',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    icon: <Clock className="w-3 h-3" />
  },
  {
    status: 'ARCHIVED',
    label: 'Archived',
    color: 'text-muted-dark/50',
    bg: 'bg-border-dark/20 border-border-dark',
    icon: <Archive className="w-3 h-3" />
  }
]

// ─── Concert Card ─────────────────────────────────────────────────────────────

function ConcertCard({ concert, index }: { concert: Concert; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <Link
        href={`/v2/concerts/${concert.id}/edit`}
        className="flex flex-col gap-2 p-3 border border-border-dark bg-surface-dark hover:border-primary-dark hover:bg-button-dark transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
      >
        {/* Image */}
        {concert.imageUrl && (
          <div className="w-full h-24 overflow-hidden border border-border-dark">
            <Picture
              priority
              src={concert.imageUrl}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Info */}
        <div className="min-w-0">
          <p className="text-text-dark text-xs font-medium leading-tight group-hover:text-primary-dark transition-colors">
            {concert.name}
          </p>
          {concert.subtitle && <p className="text-muted-dark/60 text-[10px] mt-0.5 truncate">{concert.subtitle}</p>}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          {concert.cardDate && (
            <span className="text-[9px] font-mono text-muted-dark/50 truncate">{concert.cardDate}</span>
          )}
          {concert.type && (
            <span className="text-[8px] font-mono tracking-widest uppercase text-muted-dark/40 border border-border-dark px-1.5 py-0.5 shrink-0">
              {concert.type}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Season Group ─────────────────────────────────────────────────────────────

function SeasonGroup({ group, index }: { group: ISeasonGroup; index: number }) {
  const [open, setOpen] = useState(index === 0)

  const total = group.draft.length + group.live.length + group.archived.length

  return (
    <div className="border-b border-border-dark last:border-0">
      {/* Season header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-surface-dark transition-colors focus-visible:outline-none group"
      >
        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-4 h-4 text-muted-dark" />
          </motion.div>
          <div className="flex items-center gap-3">
            <span className="font-quicksand font-black text-text-dark text-lg">{group.season || 'No Season'}</span>
            <span className="text-[9px] font-mono text-muted-dark/40">
              ({total} concert{total !== 1 ? 's' : ''})
            </span>
          </div>
        </div>

        {/* Mini status pills */}
        <div className="flex items-center gap-2">
          {group.live.length > 0 && (
            <span className="flex items-center gap-1 text-[8px] font-mono uppercase text-emerald-400">
              <CheckCircle className="w-2.5 h-2.5" />
              {group.live.length}
            </span>
          )}
          {group.draft.length > 0 && (
            <span className="flex items-center gap-1 text-[8px] font-mono uppercase text-yellow-400">
              <Clock className="w-2.5 h-2.5" />
              {group.draft.length}
            </span>
          )}
          {group.archived.length > 0 && (
            <span className="flex items-center gap-1 text-[8px] font-mono uppercase text-muted-dark/40">
              <Archive className="w-2.5 h-2.5" />
              {group.archived.length}
            </span>
          )}
        </div>
      </button>

      {/* Season body — three status columns */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border-dark">
              {STATUS_COLS.map((col, i) => {
                const items = col.status === 'LIVE' ? group.live : col.status === 'DRAFT' ? group.draft : group.archived

                return (
                  <div
                    key={col.status}
                    className={`${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-border-dark' : ''}`}
                  >
                    {/* Column header */}
                    <div className={`flex items-center gap-2 px-4 py-2.5 border-b border-border-dark ${col.bg}`}>
                      <span className={col.color}>{col.icon}</span>
                      <span className={`text-[9px] font-mono tracking-widest uppercase ${col.color}`}>{col.label}</span>
                      <span className="text-[9px] font-mono text-muted-dark/40">({items.length})</span>
                    </div>

                    {/* Cards */}
                    <div className="p-3 space-y-3">
                      {items.length === 0 ? (
                        <div className="py-4 text-center">
                          <p className="text-muted-dark/30 text-[10px] font-mono">None</p>
                        </div>
                      ) : (
                        items.map((concert, j) => <ConcertCard key={concert.id} concert={concert} index={j} />)
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ConcertsPageClient({ concerts }: Props) {
  const seasonGroups = useMemo<ISeasonGroup[]>(() => {
    const map: Record<string, ISeasonGroup> = {}

    concerts.forEach((c) => {
      const key = c.season || 'No Season'
      if (!map[key]) {
        map[key] = { season: key, draft: [], live: [], archived: [] }
      }
      if (c.status === 'LIVE') map[key].live.push(c)
      else if (c.status === 'DRAFT') map[key].draft.push(c)
      else map[key].archived.push(c)
    })

    // Sort seasons newest first — "26-27" > "25-26"
    return Object.values(map).sort((a, b) => {
      if (a.season === 'No Season') return 1
      if (b.season === 'No Season') return -1
      return b.season.localeCompare(a.season)
    })
  }, [concerts])

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <div className="shrink-0 h-11 bg-surface-dark border-b border-border-dark flex items-center justify-between px-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/v2/dashboard"
            className="text-muted-dark hover:text-text-dark transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <Music2 className="w-3.5 h-3.5 text-primary-dark" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-widest uppercase text-muted-dark">Concerts</span>
          <span className="text-[9px] font-mono text-muted-dark/40">({concerts.length})</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/v2/concerts/new"
            className="flex items-center gap-2 px-4 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark"
          >
            <Plus className="w-3 h-3" aria-hidden="true" />
            New Concert
          </Link>
          <div className="w-px h-4 bg-border-dark" aria-hidden="true" />
          <LogoutButton />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto">
        {concerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Music2 className="w-10 h-10 text-border-dark" aria-hidden="true" />
            <p className="text-muted-dark text-sm">No concerts yet.</p>
            <Link
              href="/v2/concerts/new"
              className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add the first one
            </Link>
          </div>
        ) : (
          seasonGroups.map((group, i) => <SeasonGroup key={group.season} group={group} index={i} />)
        )}
      </div>
    </div>
  )
}
