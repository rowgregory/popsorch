import { Reducer, createSlice } from '@reduxjs/toolkit'
import { IConcert } from '@/app/types/entities/concert'

export const concertEventDetailsLocationState = { name: '', id: '', address: '', longitude: 0, latitude: 0 }

export const concertEventDetailsState = {
  id: '',
  dayOfWeek: '',
  date: '',
  time: '',
  city: '',
  location: concertEventDetailsLocationState,
  externalLink: '',
  latitude: 0,
  longitude: 0
}

export interface ConcertStatePayload {
  loading: boolean
  error: any
  success: boolean
  concerts: IConcert[]
  concert: IConcert
  concertsCount: number
  noConcerts: boolean
  concertDrawer: boolean
}

const concertState: IConcert = {
  id: '',
  name: '',
  description: '',
  eventDetails: [],
  imageUrl: '',
  imageFilename: '',
  isOnSale: false,
  type: '',
  pressRelease: '',
  allSeriesExternalLink: '',
  cardDate: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialConcertState: ConcertStatePayload = {
  loading: true,
  error: null,
  success: false,
  concerts: [],
  concert: concertState,
  concertsCount: 0,
  noConcerts: false,
  concertDrawer: false
}

export const concertSlice = createSlice({
  name: 'concert',
  initialState: initialConcertState,
  reducers: {
    resetConcert: (state) => {
      state.error = null
      state.concert = concertState
    },
    setConcerts: (state, { payload }) => {
      state.concerts = payload
      state.concertsCount = payload?.length
      state.noConcerts = payload?.length === 0
    },
    resetConcertError: (state) => {
      state.error = null
    },
    addConcertToState: (state, { payload }) => {
      state.concerts.push(payload)
      state.concertsCount = state.concertsCount + 1
      state.noConcerts = state.concerts.length === 0
    },
    updateConcertInState: (state, { payload }) => {
      const index = state.concerts.findIndex((concert) => concert.id === payload.id)

      if (index !== -1) {
        state.concerts[index] = payload
      }
    },
    removeConcertFromState: (state, { payload }) => {
      state.concerts = state.concerts.filter((concert) => concert.id !== payload)
      state.concertsCount = state.concertsCount - 1
      state.noConcerts = state.concerts.length === 0
    },
    setOpenConcertDrawer: (state) => {
      state.concertDrawer = true
    },
    setCloseConcertDrawer: (state) => {
      state.concertDrawer = false
    }
  }
})

export const concertReducer = concertSlice.reducer as Reducer<ConcertStatePayload>

export const {
  resetConcert,
  setConcerts,
  resetConcertError,
  addConcertToState,
  updateConcertInState,
  removeConcertFromState,
  setOpenConcertDrawer,
  setCloseConcertDrawer
} = concertSlice.actions
