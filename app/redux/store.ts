'use client'

import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from './features/appSlice'
import { formReducer } from './features/formSlice'
import { toastReducer } from './features/toastSlice'
import { uiReducer } from './features/uiSlice'
import { mailChimpReducer } from './features/mailchimpSlice'

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
  mailchimp: mailChimpReducer,
  toast: toastReducer,
  ui: uiReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export type AppSelector = typeof store.getState

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFormSelector = () => useAppSelector((state) => state.form)
export const useToastSelector = () => useAppSelector((state) => state.toast)
export const useMailchimpSelector = () => useAppSelector((state) => state.mailchimp)
export const useUiSelector = () => useAppSelector((state) => state.ui)
