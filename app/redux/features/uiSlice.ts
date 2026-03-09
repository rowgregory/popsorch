import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UiStatePayload {
  contactSubmissionModal: boolean
  userDrawer: boolean
}

export const initialUiState: UiStatePayload = {
  contactSubmissionModal: false,
  userDrawer: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    setOpenContactSubmissionSuccessModal: (state) => {
      state.contactSubmissionModal = true
    },
    setCloseContactSubmissionSuccessModal: (state) => {
      state.contactSubmissionModal = false
    },
    setOpenUserDrawer: (state) => {
      state.userDrawer = true
    },
    setCloseUserDrawer: (state) => {
      state.userDrawer = false
    }
  }
})

export const uiReducer = uiSlice.reducer as Reducer<UiStatePayload>

export const {
  setCloseContactSubmissionSuccessModal,
  setOpenContactSubmissionSuccessModal,
  setCloseUserDrawer,
  setOpenUserDrawer
} = uiSlice.actions
