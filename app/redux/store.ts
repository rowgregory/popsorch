'use client'

import { combineReducers, Reducer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './services/api'
import { appReducer } from './features/appSlice'
import { formReducer } from './features/formSlice'
import { logReducer } from './features/logSlice'
import { toastReducer } from './features/toastSlice'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import type { PersistPartial } from 'redux-persist/es/persistReducer'
import { uiReducer } from './features/uiSlice'
import { mailChimpReducer } from './features/mailchimpSlice'

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
  log: logReducer,
  mailchimp: mailChimpReducer,
  toast: toastReducer,
  ui: uiReducer,
  [api.reducerPath]: api.reducer
})

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    }
  }
}

// Use localStorage on client, noop on server
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['teamMember', 'accessibility'] // Only persist teamMembers slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Before configureStore, add this:
type PersistedReducer = Reducer<ReturnType<typeof rootReducer> & PersistPartial>

export const store = configureStore({
  reducer: persistedReducer as PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(api.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer> & PersistPartial

export type AppDispatch = typeof store.dispatch
export type AppSelector = typeof store.getState

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFormSelector = () => useAppSelector((state) => state.form)
export const useToastSelector = () => useAppSelector((state) => state.toast)
export const useMailchimpSelector = () => useAppSelector((state) => state.mailchimp)
export const useLogSelector = () => useAppSelector((state) => state.log)
export const useUiSelector = () => useAppSelector((state) => state.ui)
