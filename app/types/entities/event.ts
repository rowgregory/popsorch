import { Event, EventStatus } from '@prisma/client'

export interface EventInput {
  title: string
  date: string
  location?: string
  description?: string
  status?: EventStatus
}

export type TEventsEditorPanel = {
  event: Event | null
  isNew: boolean
  onSaved: (e: Event) => void
  onCancel: () => void
}
