import { ShowForm } from '@/app/types/entities/concert'
import { Venue } from '@prisma/client'
import { motion } from 'framer-motion'
import { VenueCombobox } from './VenueComboBox'
import { FieldLabel } from '../common/FieldLabel'
import { X } from 'lucide-react'

export function ShowRow({
  show,
  index,
  venues,
  onChange,
  onRemove,
  onVenueCreated
}: {
  show: ShowForm
  index: number
  venues: Venue[]
  onChange: (updated: ShowForm) => void
  onRemove: () => void
  onVenueCreated: (venue: Venue) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="border-b border-border-dark/50 last:border-0 px-4 py-3"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-dark">Show {index + 1}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-dark/40 hover:text-red-400 transition-colors focus-visible:outline-none"
          aria-label={`Remove show ${index + 1}`}
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2">
        {/* Venue */}
        <div>
          <FieldLabel required>Venue</FieldLabel>
          <VenueCombobox
            venues={venues}
            value={show.venueId}
            onChange={(venueId, venueName) => onChange({ ...show, venueId, venueName })}
            onVenueCreated={onVenueCreated}
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <FieldLabel required>Date</FieldLabel>
            <input
              type="date"
              value={show.date}
              onChange={(e) => onChange({ ...show, date: e.target.value })}
              className="w-full px-2 py-2 bg-bg-dark border border-border-dark text-text-dark text-xs focus:outline-none focus:border-primary-dark transition-colors"
            />
          </div>
          <div>
            <FieldLabel required>Time</FieldLabel>
            <input
              type="time"
              value={show.time}
              onChange={(e) => onChange({ ...show, time: e.target.value })}
              className="w-full px-2 py-2 bg-bg-dark border border-border-dark text-text-dark text-xs focus:outline-none focus:border-primary-dark transition-colors"
            />
          </div>
        </div>

        {/* Ticket link */}
        <div>
          <FieldLabel>Ticket Link</FieldLabel>
          <input
            type="url"
            value={show.externalLink}
            onChange={(e) => onChange({ ...show, externalLink: e.target.value })}
            placeholder="https://..."
            className="w-full px-2 py-2 bg-bg-dark border border-border-dark text-text-dark text-xs placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors"
          />
        </div>
      </div>
    </motion.div>
  )
}
