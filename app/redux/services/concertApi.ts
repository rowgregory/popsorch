import { addConcertToState, removeConcertFromState, updateConcertInState } from '../features/concertSlice'
import { api } from './api'

const BASE_URL = '/concert'

export const concertApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchConcerts: build.query({
      query: () => `${BASE_URL}/fetch-concerts`
    }),
    fetchConcertById: build.query({
      query: (concertId: string) => `${BASE_URL}/fetch-concert-by-id/${concertId}`,
      providesTags: (_, __, id) => [{ type: 'Concert', id }]
    }),
    createConcert: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-concert`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addConcertToState(data.concert))
      }
    }),
    updateConcert: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/update-concert`, method: 'PATCH', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateConcertInState(data.concert))
      }
    }),
    deleteConcert: build.mutation({
      query: ({ id }) => ({ url: `${BASE_URL}/delete-concert`, method: 'DELETE', body: { id } }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeConcertFromState(arg.id))
      }
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
