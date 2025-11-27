import { handleOffline } from '@/app/utils/handleOffline'
import { setConcerts } from '../features/concertSlice'
import { setDashboardError } from '../features/dashboardSlice'
import { setPhotoGalleryImages } from '../features/photoGalleryImageSlice'
import { setBoardMembers, setMusicians, setStaff, setTeamMembers } from '../features/teamMemberSlice'
import { setTextBlocks } from '../features/textBlockSlice'
import { setVenues } from '../features/venueSlice'
import { api } from './api'
import { hydrateAppState } from '../features/appSlice'
import { hydrateHeaderButton } from '../features/headerButtonSlice'

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
            data: {
              textBlocks,
              concerts,
              venues,
              photoGalleryImages,
              teamMembers,
              staff,
              boardMembers,
              isSeasonPackageBannerToggledLive,
              isSeasonPackageBannerToggledVisible,
              isFeatureToggleCardLive,
              isFeatureToggleCardVisible,
              headerButton,
              musicians
            }
          } = await queryFulfilled
          dispatch(setTextBlocks(textBlocks))
          dispatch(setConcerts(concerts))
          dispatch(setVenues(venues))
          dispatch(setPhotoGalleryImages(photoGalleryImages))
          dispatch(setTeamMembers(teamMembers))
          dispatch(setStaff(staff))
          dispatch(setBoardMembers(boardMembers))
          dispatch(setMusicians(musicians))
          dispatch(
            hydrateAppState({
              isSeasonPackageBannerToggledLive,
              isSeasonPackageBannerToggledVisible,
              isFeatureToggleCardLive,
              isFeatureToggleCardVisible
            })
          )
          dispatch(hydrateHeaderButton(headerButton))
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
      providesTags: ['App']
    }),
    toggleSeasonPackageBanner: build.mutation({
      query: () => ({
        url: `${BASE_URL}/toggle-season-package-banner-visible`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['App']
    }),
    toggleSeasonPackageBannerLive: build.mutation({
      query: () => ({
        url: `${BASE_URL}/toggle-season-package-banner-live`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['App']
    }),
    featureToggleCardVisible: build.mutation({
      query: () => ({
        url: `${BASE_URL}/feature-toggle-card-visible`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['App']
    }),
    featureToggleCardLive: build.mutation({
      query: () => ({
        url: `${BASE_URL}/feature-toggle-card-live`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['App']
    })
  })
})

export const {
  useFetchAppDataQuery,
  useFetchDashboardDataQuery,
  useToggleSeasonPackageBannerMutation,
  useToggleSeasonPackageBannerLiveMutation,
  useFeatureToggleCardVisibleMutation,
  useFeatureToggleCardLiveMutation
} = appApi
