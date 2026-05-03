import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface AppStatePayload {
  navigationDrawer: boolean
}

const initialAppState: AppStatePayload = {
  navigationDrawer: false
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
    }
  }
})

export const appReducer = appSlice.reducer as Reducer<AppStatePayload>

export const { openNavigationDrawer, closeNavigationDrawer } = appSlice.actions
