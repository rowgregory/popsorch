import { Reducer, createSlice } from '@reduxjs/toolkit'
import { lunchApi } from '../services/lunchApi'

export interface LunchStatePayload {
  loading: boolean
  success: boolean
  error: any
  lunches: []
}

const initialLunchState: LunchStatePayload = {
  loading: true,
  success: false,
  lunches: [],
  error: null
}

export const lunchSlice = createSlice({
  name: 'lunch',
  initialState: initialLunchState,
  reducers: {
    resetLunchError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(lunchApi.endpoints.fetchLunches.matchFulfilled, (state, { payload }: any) => {
        state.lunches = payload.lunches
        state.loading = false
      })
      .addMatcher(lunchApi.endpoints.createLunch.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'lunchApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const lunchReducer = lunchSlice.reducer as Reducer<LunchStatePayload>

export const { resetLunchError } = lunchSlice.actions
