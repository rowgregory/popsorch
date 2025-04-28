import { Reducer, createSlice } from '@reduxjs/toolkit'
import { concertApi } from '../services/concertApi'

export interface ConcertEventDetailsLocationProps {
  name: string
  id: string
  address: string
}

export interface ConcertEventDetailsProps {
  id: string
  dayOfWeek: string
  date: string
  time: string
  city: string
  location: ConcertEventDetailsLocationProps
  externalLink: string
  lat: number
  long: number
}

export const concertEventDetailsLocationState = { name: '', id: '', address: '' }

export const concertEventDetailsState = {
  id: '',
  dayOfWeek: '',
  date: '',
  time: '',
  city: '',
  location: concertEventDetailsLocationState,
  externalLink: '',
  lat: 0,
  long: 0
}

export interface ConcertProps {
  id: string
  name: string
  description: string
  eventDetails: ConcertEventDetailsProps[]
  imageUrl: string
  imageFilename: string
  isOnSale: boolean
  type: string
  allSeriesExternalLink: string
  createdAt: Date
  updatedAt: Date
}

export interface ConcertStatePayload {
  loading: boolean
  error: any
  success: boolean
  concerts: []
  concert: ConcertProps
}

const concertState: ConcertProps = {
  id: '',
  name: '',
  description: '',
  eventDetails: [],
  imageUrl: '',
  imageFilename: '',
  isOnSale: false,
  type: '',
  allSeriesExternalLink: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialConcertState: ConcertStatePayload = {
  loading: true,
  error: null,
  success: false,
  concerts: [],
  concert: concertState
}

export const concertSlice = createSlice({
  name: 'concert',
  initialState: initialConcertState,
  reducers: {
    resetConcert: (state) => {
      state.error = null
      state.concert = concertState
    },
    setConcerts: (state, { payload }: any) => {
      state.concerts = payload
    },
    resetConcertError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(concertApi.endpoints.fetchConcerts.matchFulfilled, (state, { payload }: any) => {
        state.concerts = payload.concerts
        state.loading = false
        state.success = true
      })
      .addMatcher(concertApi.endpoints.fetchConcertById.matchFulfilled, (state, { payload }: any) => {
        state.concert = payload.concert
        state.loading = false
      })
      .addMatcher(concertApi.endpoints.createConcert.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(concertApi.endpoints.updateConcert.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(concertApi.endpoints.deleteConcert.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'concertApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const concertReducer = concertSlice.reducer as Reducer<ConcertStatePayload>

export const { resetConcert, setConcerts, resetConcertError } = concertSlice.actions
