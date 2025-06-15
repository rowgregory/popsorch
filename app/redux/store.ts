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
import { textBlockReducer } from './features/textBlockSlice'
import { concertReducer } from './features/concertSlice'
import { formReducer } from './features/formSlice'
import { venueReducer } from './features/venueSlice'
import { teamMemberReducer } from './features/teamMemberSlice'
import { photoGalleryImageReducer } from './features/photoGalleryImageSlice'
import { testimonialReducer } from './features/testimonialSlice'
import { userReducer } from './features/userSlice'
import { questionReducer } from './features/questionSlice'
import { pushNotificationReducer } from './features/pushNotificationSlice'
import { campReducer } from './features/campSlice'
import { logReducer } from './features/logSlice'
import { mailChimpReducer } from './features/mailchimpSlice'
import { metricReducer } from './features/metricSlice'
import { headerButtonReducer } from './features/headerButtonSlice'

const rootReducer = combineReducers({
  app: appReducer,
  scraper: scraperReducer,
  lunch: lunchReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  textBlock: textBlockReducer,
  concert: concertReducer,
  form: formReducer,
  venue: venueReducer,
  teamMember: teamMemberReducer,
  photoGalleryImage: photoGalleryImageReducer,
  testimonial: testimonialReducer,
  user: userReducer,
  question: questionReducer,
  pushNotification: pushNotificationReducer,
  camp: campReducer,
  log: logReducer,
  mailchimp: mailChimpReducer,
  metric: metricReducer,
  headerButton: headerButtonReducer,
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
