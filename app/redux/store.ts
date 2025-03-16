'use client'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './services/api'
import { appReducer } from './features/appSlice'
import { scraperReducer } from './features/scraperSlice'
import { lunchReducer } from './features/lunchSlice'
import { authReducer } from './features/authSlice'
import { dashboardReducer } from './features/dashboardSlice'

const rootReducer = combineReducers({
  app: appReducer,
  scraper: scraperReducer,
  lunch: lunchReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  [api.reducerPath]: api.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppSelector = typeof store.getState

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
