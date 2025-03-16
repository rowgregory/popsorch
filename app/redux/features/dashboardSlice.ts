import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface DashboardStatePayload {
  loading: boolean
  navigationDrawer: boolean
  modal: boolean
  modalContent: any | null
}

const initialDashboardState: DashboardStatePayload = {
  loading: false,
  navigationDrawer: false,
  modal: false,
  modalContent: null
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
    openCreateModal: (state) => {
      state.modal = true
    },
    openUpdateModal: (state, { payload }: any) => {
      state.modal = true
      state.modalContent = payload
    },
    closeModal: (state) => {
      state.modal = false
      state.modalContent = null
    }
  }
})

export const dashboardReducer = dashboardSlice.reducer as Reducer<DashboardStatePayload>

export const { openNavigationDrawer, closeNavigationDrawer, openCreateModal, openUpdateModal, closeModal } = dashboardSlice.actions
