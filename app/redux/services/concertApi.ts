import { api } from './api'

const BASE_URL = '/concert'

export const concertApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchConcerts: build.query({
      query: () => `${BASE_URL}/fetch-concerts`,
      providesTags: ['Concert']
    }),
    fetchConcertById: build.query({
      query: (concertId: string) => `${BASE_URL}/fetch-concert-by-id/${concertId}`,
      providesTags: ['Concert']
    }),
    createConcert: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-concert`, method: 'POST', body }),
      invalidatesTags: ['Concert']
    }),
    updateConcert: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/update-concert`, method: 'PATCH', body }),
      invalidatesTags: ['Concert']
    }),
    deleteConcert: build.mutation({
      query: ({ id }) => ({ url: `${BASE_URL}/delete-concert`, method: 'DELETE', body: { id } }),
      invalidatesTags: ['Concert']
    })
  })
})

export const {
  useFetchConcertsQuery,
  useFetchConcertByIdQuery,
  useCreateConcertMutation,
  useUpdateConcertMutation,
  useDeleteConcertMutation
} = concertApi
