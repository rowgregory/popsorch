import { handleOffline } from '@/app/utils/handleOffline'
import { setCampApplications } from '../features/campSlice'
import { setConcerts } from '../features/concertSlice'
import { setDashboardError } from '../features/dashboardSlice'
import { setPhotoGalleryImages } from '../features/photoGalleryImageSlice'
import { setQuestions } from '../features/questionSlice'
import { setTeamMembers } from '../features/teamMemberSlice'
import { setTestimonials } from '../features/testimonialSlice'
import { setTextBlocks } from '../features/textBlockSlice'
import { setUser, setUsers } from '../features/userSlice'
import { setVenues } from '../features/venueSlice'
import { api } from './api'
import { setLogs } from '../features/logSlice'
import { setMailchimpMembers } from '../features/mailchimpSlice'

const BASE_URL = '/app'

export const appApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchAppData: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/fetch-app-data`
        }
      },
      onQueryStarted: async (_arg: any, { dispatch, queryFulfilled, signal }: any) => {
        if (handleOffline(signal)) {
          dispatch(setDashboardError('You are offline. Please check your internet connection.'))
          return
        }
        try {
          const {
            data: { textBlocks, concerts, testimonials, venues, photoGalleryImages, teamMembers }
          } = await queryFulfilled

          dispatch(setTextBlocks(textBlocks))
          dispatch(setConcerts(concerts))
          dispatch(setTestimonials(testimonials))
          dispatch(setVenues(venues))
          dispatch(setPhotoGalleryImages(photoGalleryImages))
          dispatch(setTeamMembers(teamMembers))
        } catch (error: any) {
          if (error instanceof Error && error.message === 'Network disconnected') {
            dispatch(setDashboardError('Request canceled due to lost connection.'))
          } else {
            dispatch(setDashboardError('Something went wrong loading the dashboard.'))
          }
        }
      },
      providesTags: ['App']
    }),
    fetchDashboardData: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/fetch-dashboard-data`
        }
      },
      onQueryStarted: async (_arg: any, { dispatch, queryFulfilled, signal }: any) => {
        if (handleOffline(signal)) {
          dispatch(setDashboardError('You are offline. Please check your internet connection.'))
          return
        }

        try {
          const {
            data: { users, user, campApplications, questions, logs, members, mailchimpMembersCount }
          } = await queryFulfilled

          dispatch(setUsers(users))
          dispatch(setUser(user))
          dispatch(setCampApplications(campApplications))
          dispatch(setQuestions(questions))
          dispatch(setLogs(logs))
          dispatch(setMailchimpMembers({ members, mailchimpMembersCount }))
        } catch (error: any) {
          if (error instanceof Error && error.message === 'Network disconnected') {
            dispatch(setDashboardError('Request canceled due to lost connection.'))
          } else {
            dispatch(setDashboardError('Something went wrong loading the dashboard.'))
          }
        }
      },
      providesTags: ['App']
    })
  })
})

export const { useFetchAppDataQuery, useFetchDashboardDataQuery } = appApi
