import { Reducer, createSlice } from '@reduxjs/toolkit'
import { lunchApi } from '../services/lunchApi'

export interface LunchStatePayload {
  loading: boolean
  success: boolean
  error: any
  lunches: []
  openAdminUpdateLunchModal: boolean
  openAdminCreateLunchModal: boolean
  modalContent: object | any
}

const initialLunchState: LunchStatePayload = {
  loading: true,
  success: false,
  lunches: [],
  error: null,
  openAdminUpdateLunchModal: false,
  openAdminCreateLunchModal: false,
  modalContent: {}
}

export const lunchSlice = createSlice({
  name: 'lunch',
  initialState: initialLunchState,
  reducers: {
    resetLunchError: (state) => {
      state.error = null
    },
    openAdminUpdateLunchModal: (state, { payload }: any) => {
      state.openAdminUpdateLunchModal = true
      state.modalContent = payload
    },
    closeAdminUpdateLunchModal: (state) => {
      state.openAdminUpdateLunchModal = false
    },
    openAdminCreateLunchModal: (state) => {
      state.openAdminCreateLunchModal = true
    },
    closeAdminCreateLunchModal: (state) => {
      state.openAdminCreateLunchModal = false
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
      .addMatcher(lunchApi.endpoints.updateLunch.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(lunchApi.endpoints.deleteLunch.matchFulfilled, (state) => {
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

export const { resetLunchError, openAdminUpdateLunchModal, closeAdminUpdateLunchModal } = lunchSlice.actions
