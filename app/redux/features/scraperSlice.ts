import { Reducer, createSlice } from '@reduxjs/toolkit'
import { scraperApi } from '../services/scraperApi'

export interface ScraperStatePayload {
  loading: boolean
  error: any
  menuItems: []
}

const initialScraperState: ScraperStatePayload = {
  loading: true,
  menuItems: [],
  error: null
}

export const scraperSlice = createSlice({
  name: 'scraper',
  initialState: initialScraperState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(scraperApi.endpoints.fetchMenuItems.matchFulfilled, (state, { payload }: any) => {
        state.menuItems = payload.menuItems
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'scraperApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const scraperReducer = scraperSlice.reducer as Reducer<ScraperStatePayload>

export const {} = scraperSlice.actions
