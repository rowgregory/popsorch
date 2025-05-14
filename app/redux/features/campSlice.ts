import { Reducer, createSlice } from '@reduxjs/toolkit'
import { campApi } from '../services/campApi'

interface Steps {
  [key: string]: boolean
}

interface CampApplication {
  id: string
  student?: Student
  address?: Address
  parent?: Parent
  consent: boolean
  musicTeacher?: string
  strings?: string
  brassAndPercussion?: string
  woodwinds?: string
  referralSource?: string
  createdAt: Date
  updatedAt: Date
}

interface Student {
  id: string
  firstName: string
  lastName: string
  grade: string
  school: string
  studentEmailAddress: string
  studentPhoneNumber: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}

interface Address {
  id: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  zipPostalCode?: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}

interface Parent {
  id: string
  firstName: string
  lastName: string
  relationshipToStudent?: string
  parentEmailAddress: string
  parentPhoneNumber: string
  campApplication?: CampApplication // Optional, as it might not exist yet
  campApplicationId?: string // Unique ID to link to a CampApplication
}

export interface CampStatePayload {
  loading: boolean
  error: any
  success: boolean
  steps: Steps
  message: string
  campApplications: CampApplication[]
  campApplication: CampApplication
  campApplicationsCount: number
  noCampApplications: boolean
}

const initialCampApplicationState: CampApplication = {
  id: '',
  consent: false,
  musicTeacher: '',
  strings: '',
  brassAndPercussion: '',
  woodwinds: '',
  referralSource: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  student: {
    id: '',
    firstName: '',
    lastName: '',
    grade: '',
    school: '',
    studentEmailAddress: '',
    studentPhoneNumber: ''
  },
  address: {
    id: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipPostalCode: ''
  },
  parent: {
    id: '',
    firstName: '',
    lastName: '',
    relationshipToStudent: '',
    parentEmailAddress: '',
    parentPhoneNumber: ''
  }
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
  campApplication: initialCampApplicationState,
  campApplicationsCount: 0,
  noCampApplications: false
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
      state.campApplicationsCount = payload.length
      state.noCampApplications = payload.length === 0
    },
    resetCampApplication: (state) => {
      state.error = null
      state.campApplication = initialCampApplicationState
    },
    addCampApplicationToState: (state, action) => {
      state.campApplications.push(action.payload)
      state.campApplicationsCount = state.campApplicationsCount + 1
      state.noCampApplications = state.campApplications.length === 0
    },
    removeCampApplicationFromState: (state, action) => {
      state.campApplications = state.campApplications.filter(
        (campApplication: { id: string }) => campApplication.id !== action.payload
      )
      state.campApplicationsCount = state.campApplicationsCount - 1
      state.noCampApplications = state.campApplications.length === 0
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
      })
      .addMatcher(campApi.endpoints.fetchCampApplications.matchFulfilled, (state, { payload }: any) => {
        state.campApplications = payload.campApplications
        state.loading = false
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

export const {
  setStep,
  resetCampSuccess,
  setCampApplications,
  resetCampApplication,
  removeCampApplicationFromState,
  addCampApplicationToState
} = campSlice.actions
