'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Plus, Check, Loader2, Search } from 'lucide-react'
import type { Venue } from '@prisma/client'
import { createVenueQuick } from '@/app/lib/actions/venue/createVenueQuick'

interface VenueComboboxProps {
  venues: Venue[]
  value: string // venueId
  onChange: (venueId: string, venueName: string) => void
  onVenueCreated?: (venue: Venue) => void
}

export function VenueCombobox({ venues, value, onChange, onVenueCreated }: VenueComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(false)

  const selected = venues.find((v) => v.id === value)
  const filtered = venues.filter((v) => v.name.toLowerCase().includes(query.toLowerCase()))

  const handleSelect = (venue: Venue) => {
    onChange(venue.id, venue.name)
    setOpen(false)
    setQuery('')
  }

  const handleQuickCreate = async () => {
    if (!newName.trim()) return
    setLoading(true)
    const res = await createVenueQuick({ name: newName.trim() })
    setLoading(false)
    if (res.success && res.data) {
      onVenueCreated(res.data)
      onChange(res.data.id, res.data.name)
      setOpen(false)
      setQuery('')
      setCreating(false)
      setNewName('')
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 bg-bg-dark border text-sm text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark ${
          open ? 'border-primary-dark' : 'border-border-dark hover:border-muted-dark'
        }`}
      >
        <MapPin className="w-3.5 h-3.5 text-muted-dark shrink-0" aria-hidden="true" />
        {selected ? (
          <span className="text-text-dark truncate">{selected.name}</span>
        ) : (
          <span className="text-muted-dark/40">Select or create a venue...</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full mt-1 bg-surface-dark border border-border-dark z-50 shadow-xl"
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border-dark">
              <Search className="w-3 h-3 text-muted-dark shrink-0" aria-hidden="true" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setCreating(false)
                }}
                placeholder="Search venues..."
                className="flex-1 bg-transparent text-text-dark text-xs placeholder:text-muted-dark/40 focus:outline-none"
              />
            </div>

            <div className="max-h-44 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="px-3 py-3 text-center">
                  <p className="text-muted-dark text-[10px]">
                    {query ? `No venues matching "${query}"` : 'No venues yet'}
                  </p>
                </div>
              )}
              {filtered.map((venue) => (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => handleSelect(venue)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2.5 hover:bg-button-dark transition-colors text-left border-b border-border-dark/30 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-text-dark text-xs font-medium truncate">{venue.name}</p>
                    {venue.address && <p className="text-muted-dark text-[9px] truncate">{venue.address}</p>}
                  </div>
                  {value === venue.id && <Check className="w-3 h-3 text-primary-dark shrink-0" aria-hidden="true" />}
                </button>
              ))}
            </div>

            <div className="border-t border-border-dark">
              {!creating ? (
                <button
                  type="button"
                  onClick={() => {
                    setCreating(true)
                    setNewName(query)
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-button-dark transition-colors"
                >
                  <Plus className="w-3 h-3 text-primary-dark shrink-0" aria-hidden="true" />
                  <span className="text-primary-dark text-[10px] font-mono tracking-[0.15em] uppercase">
                    {query ? `Create "${query}"` : 'Create new venue'}
                  </span>
                </button>
              ) : (
                <div className="px-3 py-2.5 space-y-2">
                  <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark">New Venue Name</p>
                  <div className="flex gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleQuickCreate()}
                      placeholder="Riverview Performing Arts Center"
                      className="flex-1 min-w-0 px-2 py-1.5 bg-bg-dark border border-border-dark text-text-dark text-xs placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleQuickCreate}
                      disabled={loading || !newName.trim()}
                      className="px-3 py-1.5 bg-primary-dark hover:bg-secondary-light text-white text-[9px] font-mono uppercase transition-colors disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" /> : 'Add'}
                    </button>
                  </div>
                  <p className="text-[9px] text-muted-dark/40 font-mono">Fill in full details later from Venues</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
