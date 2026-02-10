import { cauldronFolders } from '@/app/lib/constants/admin'
import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface DashboardStatePayload {
  loading: boolean
  adminSidebar: boolean
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
  lastModifiedHeaderButton: string
  logs: []
  members: []
  iceQueen: boolean
  ga4: boolean
  pageSelectorModal: boolean
  selectedCauldronFolder: string
}

const initialDashboardState: DashboardStatePayload = {
  loading: false,
  adminSidebar: false,
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
  lastModifiedHeaderButton: new Date().toISOString(),
  logs: [],
  members: [],
  iceQueen: false,
  ga4: false,
  pageSelectorModal: false,
  selectedCauldronFolder: cauldronFolders[0].value
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardState,
  reducers: {
    setOpenAdminSidebar: (state) => {
      state.adminSidebar = true
    },
    setCloseAdminSidebar: (state) => {
      state.adminSidebar = false
    },
    setToggleAdminSidebar: (state, { payload }) => {
      state.adminSidebar = !payload
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
      state.campApplicationCount = payload.campApplicationCount
      state.questionCount = payload.questionCount
      state.concertsCount = payload.concertsCount
      state.teamMembersCount = payload.teamMembersCount
      state.questionsCount = payload.questionsCount
      state.photoGalleryImagesCount = payload.photoGalleryImagesCount
      state.sponsorCount = payload.sponsorCount
      state.venuesCount = payload.venuesCount
    },
    setOpenIceQueen: (state) => {
      state.iceQueen = true
    },
    setCloseIceQueen: (state) => {
      state.iceQueen = false
    },
    setOpenGA4Drawer: (state) => {
      state.ga4 = true
    },
    setCloseGA4Drawer: (state) => {
      state.ga4 = false
    },
    setOpenPageSelectorModal: (state) => {
      state.pageSelectorModal = true
    },
    setClosePageSelectorModal: (state) => {
      state.pageSelectorModal = false
    },
    setSelectedCauldronFolder: (state, { payload }) => {
      state.selectedCauldronFolder = payload
    },
    clearSelectedCauldronFolder: (state) => {
      state.selectedCauldronFolder = ''
    }
  }
})

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>

export const {
  setOpenAdminSidebar,
  setCloseAdminSidebar,
  resetDashboardError,
  setDashboardError,
  setOpenConductorModal,
  setCloseConductorModal,
  setCurrentDialogue,
  setDashboardData,
  setCloseIceQueen,
  setOpenIceQueen,
  setCloseGA4Drawer,
  setOpenGA4Drawer,
  setToggleAdminSidebar,
  setClosePageSelectorModal,
  setOpenPageSelectorModal,
  setSelectedCauldronFolder,
  clearSelectedCauldronFolder
} = dashboardSlice.actions
