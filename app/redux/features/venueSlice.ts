import { Reducer, createSlice } from '@reduxjs/toolkit'
import { venueApi } from '../services/venueApi'
import { VenueProps } from '@/app/types/model.types'

export interface VenueStatePayload {
  loading: boolean
  error: any
  success: boolean
  venues: []
  venue: VenueProps
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
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialVenueState: VenueStatePayload = {
  loading: true,
  error: null,
  success: false,
  venues: [],
  venue: venueState
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
    },
    resetVenueError: (state) => {
      state.error = null
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

export const { resetVenue, setVenues, resetVenueError } = venueSlice.actions
