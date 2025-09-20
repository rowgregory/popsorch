import { api } from './api'

const BASE_URL = '/header-button'

export const headerButtonApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchHeaderButtons: build.query({
      query: () => `${BASE_URL}/fetch-header-buttons`,
      providesTags: ['Header-Button']
    }),
    createHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-header-button`, method: 'POST', body }),
      invalidatesTags: ['Header-Button']
    }),
    assignHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/assign-header-button`, method: 'PUT', body }),
      invalidatesTags: ['Header-Button']
    }),
    deleteHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-header-button`, method: 'DELETE', body }),
      invalidatesTags: ['Header-Button']
    }),
    updateHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-header-button`, method: 'PUT', body }),
      invalidatesTags: ['Header-Button']
    })
  })
})

export const {
  useFetchHeaderButtonsQuery,
  useCreateHeaderButtonMutation,
  useDeleteHeaderButtonMutation,
  useAssignHeaderButtonMutation,
  useUpdateHeaderButtonMutation
} = headerButtonApi
