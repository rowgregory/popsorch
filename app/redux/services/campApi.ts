import { api } from './api'

const BASE_URL = '/camp'

export const campApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createCampApplication: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/create-camp-application`,
        method: 'POST',
        body
      })
    }),
    deleteCampApplication: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/delete-camp-application`,
        method: 'DELETE',
        body
      })
    })
  })
})

export const { useCreateCampApplicationMutation, useDeleteCampApplicationMutation } = campApi
