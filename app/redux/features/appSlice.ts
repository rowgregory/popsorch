import { Reducer, createSlice } from '@reduxjs/toolkit'
import { appApi } from '../services/appApi'

interface ModalUploaderPayload {
  show: boolean
  src: any
  type: string
  textBlockKey: string
  initialValue?: string
}

export interface AppStatePayload {
  loading: boolean
  success: boolean
  error: any
  navigationDrawer: boolean
  seatMap: boolean
  openModal: boolean
  drawer: boolean
  data: {
    show: boolean
    initialValue: string
    type: string
    textBlockKey: string
  }
  drawerData: {
    position: string
    firstName: string
    lastName: string
    imageUrl: string
    bio: string
    selectedIndex: number
  } | null
  concertsCount: number
  venuesCount: number
  teamMembersCount: number
  photoGalleryImagesCount: number
  testimonialsCount: number
  usersCount: number
  mediaData: ModalUploaderPayload
  openModalImageUploaderPublic: boolean
  drawerList: []
  selectedIndex: any
  campApplicationCount: number
  questionCount: number
  logCount: number
  isOnline: boolean
  accessibility: boolean
  metric: { desktopCount: number; mobileCount: number }
}

const mediaDataInitialState = {
  show: false,
  src: '',
  type: '',
  textBlockKey: '',
  initialValue: ''
}

const initialAppState: AppStatePayload = {
  loading: true,
  success: false,
  error: {},
  navigationDrawer: false,
  seatMap: false,
  openModal: false,
  drawer: false,
  data: {
    show: false,
    initialValue: '',
    type: '',
    textBlockKey: ''
  },
  drawerData: null,
  concertsCount: 0,
  venuesCount: 0,
  teamMembersCount: 0,
  photoGalleryImagesCount: 0,
  testimonialsCount: 0,
  usersCount: 0,
  mediaData: mediaDataInitialState,
  openModalImageUploaderPublic: false,
  drawerList: [],
  selectedIndex: -1,
  campApplicationCount: 0,
  questionCount: 0,
  logCount: 0,
  isOnline: true,
  accessibility: false,
  metric: { desktopCount: 0, mobileCount: 0 }
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setIsOnline: (state, action) => {
      state.isOnline = action.payload
    },
    openNavigationDrawer: (state) => {
      state.navigationDrawer = true
    },
    closeNavigationDrawer: (state) => {
      state.navigationDrawer = false
    },
    openSeatMap: (state) => {
      state.seatMap = true
    },
    closeSeatMap: (state) => {
      state.seatMap = false
    },
    setOpenModal: (state, { payload }) => {
      state.openModal = true
      state.data = payload
    },
    setCloseModal: (state) => {
      state.openModal = false
    },
    setOpenDrawer: (state, { payload }) => {
      state.drawer = true
      state.drawerData = payload.teamMember
      state.drawerList = payload.teamList
      state.selectedIndex = payload.selectedIndex
    },
    setCloseDrawer: (state) => {
      state.drawer = false
    },
    resetDrawerData: (state) => {
      state.drawerData = null
    },
    setOpenModalImageUploaderPublic: (state, { payload }) => {
      state.mediaData = payload.mediaData
      state.openModalImageUploaderPublic = true
    },
    setCloseModalImageUploaderPublic: (state) => {
      state.mediaData = mediaDataInitialState
      state.openModalImageUploaderPublic = false
    },
    goToNextDrawerItem: (state) => {
      if (state.drawerList.length > 0 && state.selectedIndex !== null) {
        const nextIndex = (state.selectedIndex + 1) % state.drawerList.length
        state.selectedIndex = nextIndex
        state.drawerData = state.drawerList[nextIndex]
      }
    },
    goToPrevDrawerItem: (state) => {
      if (state.drawerList.length > 0 && state.selectedIndex !== null) {
        const prevIndex = (state.selectedIndex - 1 + state.drawerList.length) % state.drawerList.length
        state.selectedIndex = prevIndex
        state.drawerData = state.drawerList[prevIndex]
      }
    },
    setPhotoGalleryImageCount: (state, { payload }) => {
      state.photoGalleryImagesCount = payload
    },
    setTestimonialsCount: (state, { payload }) => {
      state.testimonialsCount = payload
    },
    setConcertsCount: (state, { payload }) => {
      state.concertsCount = payload
    },
    setVenuesCount: (state, { payload }) => {
      state.venuesCount = payload
    },
    setTeamMembersCount: (state, { payload }) => {
      state.teamMembersCount = payload
    },
    setQuestionCount: (state, { payload }) => {
      state.questionCount = payload
    },
    setToggleAccessibilityDrawer: (state, { payload }) => {
      state.accessibility = !payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(appApi.endpoints.fetchAppData.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(appApi.endpoints.fetchDashboardData.matchFulfilled, (state, { payload }: any) => {
        state.success = true
        state.loading = false
        state.concertsCount = payload.concertsCount
        state.venuesCount = payload.venuesCount
        state.teamMembersCount = payload.teamMembersCount
        state.photoGalleryImagesCount = payload.photoGalleryImagesCount
        state.testimonialsCount = payload.testimonialsCount
        state.usersCount = payload.usersCount
        state.campApplicationCount = payload.campApplicationCount
        state.questionCount = payload.questionCount
        state.logCount = payload.logCount
        state.metric.desktopCount = payload.metric.desktopCount
        state.metric.mobileCount = payload.metric.mobileCount
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'appApi',
        (state, action: any) => {
          state.loading = false
          state.error = action.payload?.data || 'An error occurred.'
        }
      )
  }
})

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>

export const {
  setIsOnline,
  openNavigationDrawer,
  closeNavigationDrawer,
  openSeatMap,
  closeSeatMap,
  setOpenModal,
  setCloseModal,
  setOpenModalImageUploaderPublic,
  setCloseModalImageUploaderPublic,
  setCloseDrawer,
  setOpenDrawer,
  resetDrawerData,
  goToNextDrawerItem,
  goToPrevDrawerItem,
  setPhotoGalleryImageCount,
  setTestimonialsCount,
  setConcertsCount,
  setVenuesCount,
  setTeamMembersCount,
  setQuestionCount,
  setToggleAccessibilityDrawer
} = appSlice.actions
