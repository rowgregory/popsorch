import { CONCERT_STATUS_STYLES } from '@/app/lib/constants/common'
import { ConcertWithShows } from '@/app/types/entities/concert'
import { Music2 } from 'lucide-react'
import Picture from '../../common/Picture'

export function ConcertListItem({
  concert,
  isSelected,
  onClick
}: {
  concert: ConcertWithShows
  isSelected: boolean
  onClick: () => void
}) {
  const s = CONCERT_STATUS_STYLES[concert.status]

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-border-dark/50 last:border-0 text-left transition-colors focus-visible:outline-none group ${
        isSelected ? 'bg-primary-dark/10 border-l-2 border-l-primary-dark' : 'hover:bg-surface-dark'
      }`}
    >
      {/* Image thumbnail */}
      <div className="shrink-0 w-12 h-12 overflow-hidden border border-border-dark bg-surface-dark">
        {concert.imageUrl ? (
          <Picture priority src={concert.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music2 className="w-4 h-4 text-muted-dark/30" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-text-dark text-xs font-medium truncate group-hover:text-primary-dark transition-colors">
            {concert.name}
          </p>
          <span className={`flex items-center gap-1 text-[8px] font-mono uppercase shrink-0 ${s.color}`}>
            {s.icon}
            <span className="hidden sm:block">{s.label}</span>
          </span>
        </div>
        {concert.subtitle && <p className="text-muted-dark/60 text-[10px] truncate">{concert.subtitle}</p>}
        {concert.cardDate && <p className="text-muted-dark/40 text-[9px] font-mono mt-1">{concert.cardDate}</p>}
      </div>
    </button>
  )
}
