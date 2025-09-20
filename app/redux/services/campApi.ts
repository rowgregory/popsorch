import { api } from './api'

const BASE_URL = '/camp'

export const campApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchCampApplications: build.query({
      query: () => `${BASE_URL}/fetch-camp-applications`,
      providesTags: ['Camp']
    }),
    createCampApplication: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-camp-application`, method: 'POST', body }),
      invalidatesTags: ['Camp']
    }),
    deleteCampApplication: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-camp-application`, method: 'DELETE', body }),
      invalidatesTags: ['Camp']
    })
  })
})

export const { useCreateCampApplicationMutation, useDeleteCampApplicationMutation, useFetchCampApplicationsQuery } =
  campApi
