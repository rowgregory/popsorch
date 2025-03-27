import { api } from './api'

const BASE_URL = '/lunch'

export const lunchApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    fetchLunches: build.query({
      query: () => `${BASE_URL}/fetch-lunches`,
      providesTags: ['Lunch'] // Provides a tag for cache invalidation
    }),
    createLunch: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-lunch`, method: 'POST', body }),
      invalidatesTags: ['Lunch']
    }),
    updateLunch: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-lunch`, method: 'PUT', body }),
      invalidatesTags: ['Lunch']
    }),
    deleteLunch: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-lunch`, method: 'DELETE', body }),
      invalidatesTags: ['Lunch']
    })
  })
})

export const { useFetchLunchesQuery, useCreateLunchMutation, useUpdateLunchMutation, useDeleteLunchMutation } = lunchApi
