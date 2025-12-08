import { Reducer, createSlice } from '@reduxjs/toolkit'
import { VenueProps } from '@/app/types/model.types'

export interface VenueStatePayload {
  loading: boolean
  error: any
  success: boolean
  venues: VenueProps[]
  venue: VenueProps
  venuesCount: number
  noVenues: boolean
  venueDrawer: boolean
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
  noVenues: false,
  venueDrawer: false
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
    },
    setOpenVenueDrawer: (state) => {
      state.venueDrawer = true
    },
    setCloseVenueDrawer: (state) => {
      state.venueDrawer = false
    }
  }
})

export const venueReducer = venueSlice.reducer as Reducer<VenueStatePayload>

export const {
  resetVenue,
  setVenues,
  resetVenueError,
  addVenueToState,
  updateVenueInState,
  removeVenueFromState,
  setOpenVenueDrawer,
  setCloseVenueDrawer
} = venueSlice.actions
