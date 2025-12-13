'use client'

import { combineReducers, Reducer } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { api } from './services/api'
import { appReducer } from './features/appSlice'
import { authReducer } from './features/authSlice'
import { dashboardReducer } from './features/dashboardSlice'
import { textBlockReducer } from './features/textBlockSlice'
import { concertReducer } from './features/concertSlice'
import { formReducer } from './features/formSlice'
import { venueReducer } from './features/venueSlice'
import { teamMemberReducer } from './features/teamMemberSlice'
import { photoGalleryImageReducer } from './features/photoGalleryImageSlice'
import { userReducer } from './features/userSlice'
import { questionReducer } from './features/questionSlice'
import { pushNotificationReducer } from './features/pushNotificationSlice'
import { campReducer } from './features/campSlice'
import { logReducer } from './features/logSlice'
import { mailChimpReducer } from './features/mailchimpSlice'
import { headerButtonReducer } from './features/headerButtonSlice'
import { sponsorReducer } from './features/sponsorSlice'
import { toastReducer } from './features/toastSlice'
import { quoteReducer } from './features/quoteSlice'
import { persistStore, persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import type { PersistPartial } from 'redux-persist/es/persistReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  textBlock: textBlockReducer,
  concert: concertReducer,
  form: formReducer,
  venue: venueReducer,
  teamMember: teamMemberReducer,
  photoGalleryImage: photoGalleryImageReducer,
  user: userReducer,
  question: questionReducer,
  pushNotification: pushNotificationReducer,
  camp: campReducer,
  log: logReducer,
  mailchimp: mailChimpReducer,
  headerButton: headerButtonReducer,
  sponsor: sponsorReducer,
  toast: toastReducer,
  quote: quoteReducer,
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
  whitelist: ['teamMember'] // Only persist teamMembers slice
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

export const useUserSelector = () => useAppSelector((state) => state.user)
export const useSponsorSelector = () => useAppSelector((state) => state.sponsor)
export const useConcertSelector = () => useAppSelector((state) => state.concert)
export const useTeamMemberSelector = () => useAppSelector((state) => state.teamMember)
export const useFormSelector = () => useAppSelector((state) => state.form)
export const useToastSelector = () => useAppSelector((state) => state.toast)
export const useVenueSelector = () => useAppSelector((state) => state.venue)
export const useCampSelector = () => useAppSelector((state) => state.camp)
export const usePhotoSelector = () => useAppSelector((state) => state.photoGalleryImage)
export const useMailchimpSelector = () => useAppSelector((state) => state.mailchimp)
export const useDashboardSelector = () => useAppSelector((state) => state.dashboard)
export const useTextBlockSelector = () => useAppSelector((state) => state.textBlock)
export const useQuestionSelector = () => useAppSelector((state) => state.question)
export const useLogSelector = () => useAppSelector((state) => state.log)
