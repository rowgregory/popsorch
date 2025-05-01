import { Reducer, createSlice } from '@reduxjs/toolkit'
import { campApi } from '../services/campApi'

interface Steps {
  [key: string]: boolean
}

export interface CampStatePayload {
  loading: boolean
  error: any
  success: boolean
  steps: Steps
  message: string
  campApplications: []
  campApplication: object
}

const initialCampState: CampStatePayload = {
  loading: true,
  error: null,
  success: false,
  steps: {
    personalInfo: true,
    addressInfo: false,
    parentInfo: false,
    instrumentInfo: false
  },
  message: '',
  campApplications: [],
  campApplication: {}
}

export const campSlice = createSlice({
  name: 'camp',
  initialState: initialCampState,
  reducers: {
    setStep(state, { payload }) {
      state.steps = payload
    },
    resetCampSuccess: (state) => {
      state.success = false
    },
    setCampApplications: (state, { payload }) => {
      state.campApplications = payload
    },
    resetCampApplication: (state) => {
      state.campApplication = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(campApi.endpoints.createCampApplication.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message
        state.loading = false
        state.success = true
      })
      .addMatcher(campApi.endpoints.deleteCampApplication.matchFulfilled, (state, { payload }: any) => {
        state.message = payload.message
        state.loading = false
        state.success = true
      })
      .addMatcher(campApi.endpoints.fetchCampApplications.matchFulfilled, (state, { payload }: any) => {
        state.campApplications = payload.campApplications
        state.loading = false
        state.success = true
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'campApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const campReducer = campSlice.reducer as Reducer<CampStatePayload>

export const { setStep, resetCampSuccess, setCampApplications, resetCampApplication } = campSlice.actions
