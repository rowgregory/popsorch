import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface AppStatePayload {
  loading: boolean
  navigationDrawer: boolean
  seatMap: boolean
}

const initialAppState: AppStatePayload = {
  loading: false,
  navigationDrawer: false,
  seatMap: false
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
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
    }
  }
})

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>

export const { openNavigationDrawer, closeNavigationDrawer, openSeatMap, closeSeatMap } = appSlice.actions
