import { ConcertStatus } from '@prisma/client'
import { Archive, CheckCircle, Clock } from 'lucide-react'

//  Input Styling
export const inputCls =
  'w-full px-3 py-2.5 bg-bg-dark border border-border-dark text-text-dark text-sm placeholder:text-muted-dark/30 focus:outline-none focus:border-primary-dark transition-colors'

// Concert Styling
export const CONCERT_STATUS_STYLES: Record<ConcertStatus, { color: string; icon: React.ReactNode; label: string }> = {
  DRAFT: { color: 'text-yellow-400', icon: <Clock className="w-3 h-3" />, label: 'Draft' },
  LIVE: { color: 'text-emerald-400', icon: <CheckCircle className="w-3 h-3" />, label: 'Live' },
  ARCHIVED: { color: 'text-muted-dark/40', icon: <Archive className="w-3 h-3" />, label: 'Archived' }
}
