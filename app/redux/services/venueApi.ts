import { api } from './api'

const BASE_URL = '/venue'

export const venueApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchVenues: build.query({
      query: () => `${BASE_URL}/fetch-venues`,
      providesTags: ['Venue']
    }),
    createVenue: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/create-venue`, method: 'POST', body }),
      invalidatesTags: ['Venue']
    }),
    updateVenue: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/update-venue`, method: 'PUT', body }),
      invalidatesTags: ['Venue']
    }),
    deleteVenue: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/delete-venue`, method: 'DELETE', body }),
      invalidatesTags: ['Venue']
    })
  })
})

export const { useFetchVenuesQuery, useCreateVenueMutation, useUpdateVenueMutation, useDeleteVenueMutation } = venueApi
