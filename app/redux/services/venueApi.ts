import { addVenueToState, removeVenueFromState, updateVenueInState } from '../features/venueSlice'
import { api } from './api'

const BASE_URL = '/venue'

export const venueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchVenues: build.query({
      query: () => `${BASE_URL}/fetch-venues`
    }),
    createVenue: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-venue`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addVenueToState(data.venue))
      }
    }),
    updateVenue: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-venue`, method: 'PUT', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateVenueInState(data.venue))
      }
    }),
    deleteVenue: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-venue`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeVenueFromState(arg.id))
      }
    })
  })
})

export const { useFetchVenuesQuery, useCreateVenueMutation, useUpdateVenueMutation, useDeleteVenueMutation } = venueApi
