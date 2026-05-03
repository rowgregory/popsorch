import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface CampStatePayload {
  campApplicationSuccessModal: boolean
}

const initialCampState = {
  campApplicationSuccessModal: false
}

export const campSlice = createSlice({
  name: 'camp',
  initialState: initialCampState,
  reducers: {
    setOpenCampApplicationSuccessModal: (state) => {
      state.campApplicationSuccessModal = true
    },
    setCloseCampApplicationSuccessModal: (state) => {
      state.campApplicationSuccessModal = false
    }
  }
})

export const campReducer = campSlice.reducer as Reducer<CampStatePayload>

export const { setCloseCampApplicationSuccessModal, setOpenCampApplicationSuccessModal } = campSlice.actions
