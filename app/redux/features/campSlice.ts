import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface CampStatePayload {
  campApplicationDrawer: boolean
  campApplicationSuccessModal: boolean
}

const initialCampState = {
  campApplicationDrawer: false,
  campApplicationSuccessModal: false
}

export const campSlice = createSlice({
  name: 'camp',
  initialState: initialCampState,
  reducers: {
    setOpenCampApplicationDrawer: (state) => {
      state.campApplicationDrawer = true
    },
    setCloseCampApplicationDrawer: (state) => {
      state.campApplicationDrawer = false
    },
    setOpenCampApplicationSuccessModal: (state) => {
      state.campApplicationSuccessModal = true
    },
    setCloseCampApplicationSuccessModal: (state) => {
      state.campApplicationSuccessModal = false
    }
  }
})

export const campReducer = campSlice.reducer as Reducer<CampStatePayload>

export const {
  setOpenCampApplicationDrawer,
  setCloseCampApplicationDrawer,
  setCloseCampApplicationSuccessModal,
  setOpenCampApplicationSuccessModal
} = campSlice.actions
