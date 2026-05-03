'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Plus } from 'lucide-react'
import type { Event } from '@prisma/client'
import { EventsTopBar } from '../events/EventsTopBar'
import { EventListItem } from '../events/EventListItem'
import { EventsEditorPanel } from '../events/EventsEditorPanel'

export default function EventsClient({ events: initial }: { events: Event[] }) {
  const [events, setEvents] = useState<Event[]>(initial)
  const [selected, setSelected] = useState<Event | null>(null)
  const [isNew, setIsNew] = useState(false)

  const handleNew = () => {
    setSelected(null)
    setIsNew(true)
  }
  const handleSelect = (e: Event) => {
    setIsNew(false)
    setSelected(e)
  }

  const handleSaved = (e: Event) => {
    if (isNew) {
      setEvents((prev) => [e, ...prev])
    } else {
      setEvents((prev) => prev.map((p) => (p.id === e.id ? e : p)))
    }
    setSelected(e)
    setIsNew(false)
  }

  const showEditor = isNew || selected !== null

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-dark text-text-dark">
      {/* ── Top Bar ── */}
      <EventsTopBar events={events} handleNew={handleNew} />
      <div className="shrink-0 border-b border-yellow-500/20 bg-yellow-500/5 overflow-hidden py-1.5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[0, 1].map((i) => (
            <span key={i} className="text-[9px] font-mono text-yellow-400/70 pr-16">
              <span className="text-yellow-400">IMPORTANT —</span> Do not add concerts to this section. All concerts are
              handled through CueBox. This page is for Events only — Bubbles Bash, Galas, Luncheons, and other
              non-concert events.
              <span className="text-yellow-500/50 mx-4">·</span>
              <span className="text-yellow-400">IMPORTANT —</span> Do not add concerts to this section. All concerts are
              handled through CueBox. This page is for Events only — Bubbles Bash, Galas, Luncheons, and other
              non-concert events.
              <span className="text-yellow-500/50 mx-4">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Two Column Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left — List ── */}
        <div className="w-72 xl:w-80 shrink-0 border-r border-border-dark overflow-y-auto">
          {events.length === 0 && !isNew ? (
            <div className="flex flex-col items-center justify-center h-48 gap-2">
              <Calendar className="w-8 h-8 text-border-dark" aria-hidden="true" />
              <p className="text-muted-dark text-sm">No events yet.</p>
              <button
                onClick={handleNew}
                className="text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
              >
                Add the first one
              </button>
            </div>
          ) : (
            events.map((event, i) => (
              <EventListItem
                key={i}
                event={event}
                handleSelect={handleSelect}
                i={i}
                isNew={isNew}
                selected={selected}
              />
            ))
          )}
        </div>

        {/* ── Right — Editor ── */}
        <div className="flex-1 min-w-0 relative">
          <AnimatePresence mode="wait">
            {showEditor ? (
              <motion.div
                key={isNew ? 'new' : selected?.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0"
              >
                <EventsEditorPanel
                  event={isNew ? null : selected}
                  isNew={isNew}
                  onSaved={handleSaved}
                  onCancel={() => {
                    setSelected(null)
                    setIsNew(false)
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              >
                <Calendar className="w-10 h-10 text-border-dark" aria-hidden="true" />
                <p className="text-muted-dark text-sm">Select an event to edit</p>
                <button
                  onClick={handleNew}
                  className="flex items-center gap-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-primary-dark hover:text-secondary-dark transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add new event
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
