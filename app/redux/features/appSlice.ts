import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit'

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
  mediaData: ModalUploaderPayload
  openModalImageUploaderPublic: boolean
  drawerList: any
  selectedIndex: any
  isOnline: boolean
  toggleHeaderButtonStudio: boolean
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
  mediaData: mediaDataInitialState,
  openModalImageUploaderPublic: false,
  drawerList: [],
  selectedIndex: -1,
  isOnline: true,
  toggleHeaderButtonStudio: false
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

    setOpenHeaderButtonStudio: (state) => {
      state.toggleHeaderButtonStudio = true
    },
    setCloseHeaderButtonStudio: (state) => {
      state.toggleHeaderButtonStudio = false
    },
    goToSpecificDrawerItem: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload
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
  setOpenHeaderButtonStudio,
  setCloseHeaderButtonStudio,
  goToSpecificDrawerItem
} = appSlice.actions
