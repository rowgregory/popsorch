export interface IConcertEventDetailsLocation {
  name: string
  id: string
  address: string
  latitude: number
  longitude: number
}

export interface IConcertEventDetails {
  id: string
  dayOfWeek: string
  date: string
  time: string
  city: string
  location: IConcertEventDetailsLocation
  externalLink: string
  latitude: number
  longitude: number
}

export interface IConcert {
  id: string
  name: string
  description: string
  eventDetails: IConcertEventDetails[]
  imageUrl: string
  imageFilename: string
  isOnSale: boolean
  type: string
  pressRelease: string
  allSeriesExternalLink: string
  cardDate: string
  createdAt: Date
  updatedAt: Date
}

export interface IConcertEventDetailsClient {
  concert: IConcert
  initialEventDetails: IConcertEventDetails | null
}

export interface IConcertDetailsEventLocator {
  setSelectedEventDetails: (detail: IConcertEventDetails) => void
  eventDetail: IConcertEventDetails
  selectedEventDetails: IConcertEventDetails | null
  concert: IConcert
}

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
