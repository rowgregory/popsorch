import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface DashboardStatePayload {
  loading: boolean
  navigationDrawer: boolean
  modal: boolean
  modalContent: any | null
  drawer: boolean
  drawerContent: object | any | null
  error: null | any
  bottomOverlayDrawer: boolean
  isUpdating: boolean
  type: string
  conductorModal: boolean
  currentDialogue: number
  usersCount: number
  user: any
  campApplicationCount: number
  questionCount: number
  concertsCount: number
  teamMembersCount: number
  questionsCount: number
  photoGalleryImagesCount: number
  sponsorCount: number
  venuesCount: number
  headerButtonCount: number
  lastModifiedHeaderButton: Date
  logs: []
  members: []
}

const initialDashboardState: DashboardStatePayload = {
  loading: false,
  navigationDrawer: false,
  modal: false,
  modalContent: null,
  drawer: false,
  drawerContent: null,
  error: null,
  bottomOverlayDrawer: false,
  isUpdating: false,
  type: '',
  conductorModal: false,
  currentDialogue: 0,
  usersCount: 0,
  user: {},
  campApplicationCount: 0,
  questionCount: 0,
  concertsCount: 0,
  teamMembersCount: 0,
  questionsCount: 0,
  photoGalleryImagesCount: 0,
  sponsorCount: 0,
  venuesCount: 0,
  headerButtonCount: 0,
  lastModifiedHeaderButton: new Date(),
  logs: [],
  members: []
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {
    openNavigationDrawer: (state) => {
      state.navigationDrawer = true
    },
    closeNavigationDrawer: (state) => {
      state.navigationDrawer = false
    },
    resetDashboardError: (state) => {
      state.error = null
    },
    setDashboardError: (state, { payload }) => {
      state.error = { data: { message: payload } }
    },
    setOpenConductorModal: (state) => {
      state.conductorModal = true
    },
    setCloseConductorModal: (state) => {
      state.conductorModal = false
    },
    setCurrentDialogue: (state, { payload }) => {
      state.currentDialogue = payload
    },
    setDashboardData: (state, { payload }) => {
      state.usersCount = payload.usersCount
      state.user = payload.user
      state.campApplicationCount = payload.campApplicationCount
      state.questionCount = payload.questionCount
      state.concertsCount = payload.concertsCount
      state.teamMembersCount = payload.teamMembersCount
      state.questionsCount = payload.questionsCount
      state.photoGalleryImagesCount = payload.photoGalleryImagesCount
      state.sponsorCount = payload.sponsorCount
      state.venuesCount = payload.venuesCount
      state.headerButtonCount = payload.headerButtonCount
      state.lastModifiedHeaderButton = payload.lastModifiedHeaderButton
      state.logs = payload.logs
      state.members = payload.members
    }
  }
})

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>

export const {
  openNavigationDrawer,
  closeNavigationDrawer,
  resetDashboardError,
  setDashboardError,
  setOpenConductorModal,
  setCloseConductorModal,
  setCurrentDialogue,
  setDashboardData
} = dashboardSlice.actions
