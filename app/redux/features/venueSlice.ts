import { Reducer, createSlice } from '@reduxjs/toolkit'
import { venueApi } from '../services/venueApi'
import { VenueProps } from '@/app/types/model.types'

export interface VenueStatePayload {
  loading: boolean
  error: any
  success: boolean
  venues: VenueProps[]
  venue: VenueProps
  venuesCount: number
  noVenues: boolean
}

const venueState: VenueProps = {
  id: '',
  name: '',
  capacity: '',
  accessibility: '',
  immersiveEnvironment: '',
  parking: '',
  imageUrl: '',
  imageFilename: '',
  address: '',
  longitude: '',
  latitude: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialVenueState: VenueStatePayload = {
  loading: true,
  error: null,
  success: false,
  venues: [],
  venue: venueState,
  venuesCount: 0,
  noVenues: false
}

export const venueSlice = createSlice({
  name: 'venue',
  initialState: initialVenueState,
  reducers: {
    resetVenue: (state) => {
      state.error = null
      state.venue = venueState
    },
    setVenues: (state, { payload }: any) => {
      state.venues = payload
      state.venuesCount = payload?.length
      state.noVenues = payload?.length === 0
    },
    resetVenueError: (state) => {
      state.error = null
    },
    addVenueToState: (state, action) => {
      state.venues.push(action.payload)
      state.venuesCount = state.venuesCount + 1
      state.noVenues = state.venues.length === 0
    },
    updateVenueInState: (state, action) => {
      const updatedVenue = action.payload
      const index = state.venues.findIndex((venue) => venue.id === updatedVenue.id)
      if (index !== -1) {
        state.venues[index] = updatedVenue
      }
    },
    removeVenueFromState: (state, action) => {
      state.venues = state.venues.filter((venue) => venue.id !== action.payload)
      state.venuesCount = state.venuesCount - 1
      state.noVenues = state.venues.length === 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(venueApi.endpoints.createVenue.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(venueApi.endpoints.updateVenue.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(venueApi.endpoints.fetchVenues.matchFulfilled, (state, { payload }: any) => {
        state.venues = payload.venues
        state.loading = false
      })
      .addMatcher(venueApi.endpoints.createVenue.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(venueApi.endpoints.updateVenue.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(venueApi.endpoints.deleteVenue.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'venueApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const venueReducer = venueSlice.reducer as Reducer<VenueStatePayload>

export const { resetVenue, setVenues, resetVenueError, addVenueToState, updateVenueInState, removeVenueFromState } =
  venueSlice.actions
