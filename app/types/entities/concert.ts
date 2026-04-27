// ─── Deprecated (V1 — eventDetails JSON era) ──────────────────────────────────

import { Concert, ConcertShow, ConcertStatus, ConcertType, Venue } from '@prisma/client'

/** @deprecated Use ConcertShow model instead */
export interface IConcertEventDetailsLocation {
  name: string
  id: string
  address: string
  latitude: number
  longitude: number
}

/** @deprecated Use ConcertShow model instead */
export interface IConcertEventDetails {
  id: string
  dayOfWeek: string
  date: string
  time: string
  location: IConcertEventDetailsLocation
  externalLink: string
  latitude: number
  longitude: number
  isOnSale: boolean
}

/** @deprecated Use IConcertEventDetailsClient V2 instead */
export interface IConcertEventDetailsClient {
  concert: IConcert
  initialEventDetails: IConcertEventDetails | null
}

/** @deprecated Use V2 show model instead */
export interface IConcertDetailsEventLocator {
  setSelectedEventDetails: (detail: IConcertEventDetails) => void
  eventDetail: IConcertEventDetails
  selectedEventDetails: IConcertEventDetails | null
  concert: IConcert
}

// ─── V1 Concert (still in use until full V2 migration) ───────────────────────

export interface IConcert {
  id: string
  name: string
  description: string
  imageUrl: string
  imageFilename: string
  type: string
  pressRelease: string
  cardDate: string
  createdAt: Date
  updatedAt: Date

  // V2
  cueBoxExternalLink: string
  season: string
  subtitle: string
  status: 'DRAFT' | 'LIVE' | 'ARCHIVED'
  shows: IConcertShow[]

  // Deprecated
  /** @deprecated Use status instead */
  isOnSale: boolean
  /** @deprecated Use shows (ConcertShow[]) instead */
  eventDetails: IConcertEventDetails[]
  /** @deprecated Use cueBoxExternalLink instead */
  allSeriesExternalLink: string
}

// ─── V2 ───────────────────────────────────────────────────────────────────────

export interface IConcertShow {
  id: string
  concertId: string
  venueId: string
  venue: IConcertShowVenue
  date: Date
  externalLink: string
  createdAt: Date
  updatedAt: Date
}

export interface IConcertShowVenue {
  id: string
  name: string
  address: string
  capacity: string
  imageUrl: string
}

// ─── Shared UI interfaces ─────────────────────────────────────────────────────

export interface ISearchSidebar {
  filterText: string
  setFilterText: (filterText: string) => void
  filteredConcerts: IConcert[]
  concerts: IConcert[]
}

export interface IConcertCard {
  concert: IConcert
  index: number
}

export type ConcertWithShows = Concert & {
  shows: (ConcertShow & { venue: Venue })[]
}

export interface ShowForm {
  id: string
  existingId?: string // set if editing an existing show
  venueId: string
  venueName: string
  date: string
  time: string
  externalLink: string
}

export interface ConcertFormProps {
  isEditing?: boolean
  concert?: ConcertWithShows
  venues: Venue[]
}

// ─── Create ───────────────────────────────────────────────────────────────────

export interface ICreateConcertShow {
  venueId: string
  date: string // ISO string — combined date + time
  externalLink: string
}

export interface ICreateConcertInput {
  name: string
  subtitle?: string
  description: string
  pressRelease?: string
  type?: ConcertType
  cardDate: string
  cueBoxExternalLink?: string
  status?: ConcertStatus
  imageUrl: string
  imageFilename: string
  shows: ICreateConcertShow[]
  season: string
}

// ─── Update ───────────────────────────────────────────────────────────────────

export interface IUpdateConcertShow {
  existingId?: string // present if updating an existing show, absent if new
  venueId: string
  date: string // ISO string — combined date + time
  externalLink: string
}

export interface IUpdateConcertInput {
  name: string
  subtitle?: string
  description: string
  pressRelease?: string
  type?: ConcertType
  cardDate: string
  cueBoxExternalLink?: string
  status?: ConcertStatus
  imageUrl: string
  imageFilename: string
  shows: IUpdateConcertShow[]
  season: string
}

export interface SeasonGroup {
  season: string
  draft: Concert[]
  live: Concert[]
  archived: Concert[]
}
