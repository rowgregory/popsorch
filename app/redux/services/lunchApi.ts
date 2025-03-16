import { api } from './api'

const BASE_URL = '/lunch'

export const lunchApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    fetchLunches: build.query({
      query: () => `${BASE_URL}/fetch-lunches`,
      providesTags: ['Lunch']
    }),
    createLunch: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/fetch-lunches`, method: 'POST', body }),
      providesTags: ['Lunch']
    })
  })
})

export const { useFetchLunchesQuery, useCreateLunchMutation } = lunchApi
