import { api } from './api'

const BASE_URL = '/app'

export const appApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchDashboardData: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/fetch-dashboard-data`
        }
      },
      providesTags: ['App']
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

export const { useFetchDashboardDataQuery, useFeatureToggleCardVisibleMutation, useFeatureToggleCardLiveMutation } =
  appApi
