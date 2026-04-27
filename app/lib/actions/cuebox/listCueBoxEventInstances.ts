import { CueBoxEventInstance } from '@/app/types/cuebox.types'
import { cueboxFetch } from '../../utils/cueboxFetch'

export async function listCueBoxEventInstances(options?: {
  startsAtFrom?: string // ISO date string
  startsAtTo?: string // ISO date string, max 2 years after startsAtFrom
}) {
  const params = new URLSearchParams()

  if (options?.startsAtFrom) params.set('startsAtFrom', options.startsAtFrom)
  if (options?.startsAtTo) params.set('startsAtTo', options.startsAtTo)

  const query = params.toString() ? `?${params.toString()}` : ''

  const data = await cueboxFetch<{ event_instances: CueBoxEventInstance[] }>(`/event-instances${query}`)

  if (!data) return { success: false, error: 'Failed to fetch event instances' }

  return { success: true, data: data.event_instances }
}
