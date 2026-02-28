import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UiStatePayload {
  contactSubmissionModal: boolean
}

export const initialUiState: UiStatePayload = {
  contactSubmissionModal: false
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
    }
  }
})

export const uiReducer = uiSlice.reducer as Reducer<UiStatePayload>

export const { setCloseContactSubmissionSuccessModal, setOpenContactSubmissionSuccessModal } = uiSlice.actions
