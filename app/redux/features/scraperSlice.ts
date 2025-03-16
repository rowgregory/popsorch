/* eslint-disable @typescript-eslint/no-explicit-any */
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
        console.log('FETCH MENU ITEMS PAYLOAD: ', payload)
        state.menuItems = payload.menuItems
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'scraperApi',
        (state, { payload }: any) => {
          console.log('ERROR PAYLOAD IN SLICE: ', payload)
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const scraperReducer = scraperSlice.reducer as Reducer<ScraperStatePayload>

export const {} = scraperSlice.actions
