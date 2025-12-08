import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface FetchDashboardDataQueryTypes {
  error: { data: { message: string } }
  isLoading: boolean
}

interface ModalUploaderPayload {
  show: boolean
  src: any
  type: string
  textBlockKey: string
  initialValue?: string
}

export interface AppStatePayload {
  loading: boolean
  loadingDashboardData: boolean
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
  mailchimpMembersCount: number
  isOnline: boolean
  accessibility: boolean
  metric: { desktopCount: number; mobileCount: number }
  noCampApplications: boolean
  noQuestions: boolean
  noUsers: boolean
  isSeasonPackageBannerToggledVisible: boolean
  isSeasonPackageBannerToggledLive: boolean
  toggleHeaderButtonStudio: boolean
  inconspicuousSignInDrawer: boolean
  isFeatureToggleCardLive: boolean
  isFeatureToggleCardVisible: boolean
  highContrast: boolean
  highlightLinks: boolean
  stepIndex: number
  textSpacing: boolean
  dyslexiaFriendly: boolean
  lineHeight: boolean
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
  loadingDashboardData: true,
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
  mailchimpMembersCount: 0,
  isOnline: true,
  accessibility: false,
  metric: { desktopCount: 0, mobileCount: 0 },
  noCampApplications: false,
  noQuestions: false,
  noUsers: false,
  isSeasonPackageBannerToggledVisible: false,
  isSeasonPackageBannerToggledLive: false,
  toggleHeaderButtonStudio: false,
  inconspicuousSignInDrawer: false,
  isFeatureToggleCardLive: false,
  isFeatureToggleCardVisible: false,
  highContrast: false,
  highlightLinks: false,
  stepIndex: 0,
  textSpacing: false,
  dyslexiaFriendly: false,
  lineHeight: false
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
    increasePhotoGalleryImageCount: (state) => {
      state.photoGalleryImagesCount = state.photoGalleryImagesCount + 1
    },
    decreasePhotoGalleryImageCount: (state) => {
      state.photoGalleryImagesCount = state.photoGalleryImagesCount - 1
    },
    increaseConcertsCount: (state) => {
      state.concertsCount = state.concertsCount + 1
    },
    decreaseConcertsCount: (state) => {
      state.concertsCount = state.concertsCount - 1
    },
    increaseVenuesCount: (state) => {
      state.venuesCount = state.venuesCount + 1
    },
    decreaseVenuesCount: (state) => {
      state.venuesCount = state.venuesCount - 1
    },
    increaseTeamMembersCount: (state) => {
      state.teamMembersCount = state.teamMembersCount + 1
    },
    decreaseTeamMembersCount: (state) => {
      state.teamMembersCount = state.teamMembersCount - 1
    },
    increaseQuestionCount: (state) => {
      state.questionCount = state.questionCount + 1
    },
    decreaseQuestionCount: (state) => {
      state.questionCount = state.questionCount - 1
    },
    increaseCampApplicationsCount: (state) => {
      state.campApplicationCount = state.campApplicationCount + 1
    },
    decreaseCampApplicationsCount: (state) => {
      state.campApplicationCount = state.campApplicationCount - 1
    },
    increaseUsersCount: (state) => {
      state.usersCount = state.usersCount + 1
    },
    decreaseUsersCount: (state) => {
      state.usersCount = state.usersCount - 1
    },
    setToggleAccessibilityDrawer: (state, { payload }) => {
      state.accessibility = !payload
    },
    hydrateAppState: (state, { payload }) => {
      state.isSeasonPackageBannerToggledLive = payload.isSeasonPackageBannerToggledLive
      state.isSeasonPackageBannerToggledVisible = payload.isSeasonPackageBannerToggledVisible
      state.isFeatureToggleCardLive = payload.isFeatureToggleCardLive
      state.isFeatureToggleCardVisible = payload.isFeatureToggleCardVisible
    },
    setOpeneHeaderButtonStudio: (state) => {
      state.toggleHeaderButtonStudio = true
    },
    setCloseHeaderButtonStudio: (state) => {
      state.toggleHeaderButtonStudio = false
    },
    setOpenInconspicuousSignInDrawer: (state) => {
      state.inconspicuousSignInDrawer = true
    },
    setCloseInconspicuousSignInDrawer: (state) => {
      state.inconspicuousSignInDrawer = false
    },
    setAccessibilitySettings: (state, { payload }) => {
      state.highContrast = payload.highContrast
      state.highlightLinks = payload.highlightLinks
      state.stepIndex = payload.stepIndex
      state.textSpacing = payload.textSpacing
      state.dyslexiaFriendly = payload.dyslexiaFriendly
      state.lineHeight = payload.lineHeight
    }
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
  increasePhotoGalleryImageCount,
  decreasePhotoGalleryImageCount,
  increaseConcertsCount,
  decreaseConcertsCount,
  increaseVenuesCount,
  decreaseVenuesCount,
  increaseTeamMembersCount,
  decreaseTeamMembersCount,
  increaseQuestionCount,
  decreaseQuestionCount,
  increaseCampApplicationsCount,
  decreaseCampApplicationsCount,
  increaseUsersCount,
  decreaseUsersCount,
  setToggleAccessibilityDrawer,
  hydrateAppState,
  setOpeneHeaderButtonStudio,
  setCloseHeaderButtonStudio,
  setOpenInconspicuousSignInDrawer,
  setCloseInconspicuousSignInDrawer,
  setAccessibilitySettings
} = appSlice.actions
