import { api } from './api'

const BASE_URL = '/sponsor'

export const sponsorApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    fetchSponsors: build.query({
      query: () => `${BASE_URL}/fetch-sponsors`,
      providesTags: ['Sponsor']
    }),
    createSponsor: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/create-sponsor`, method: 'POST', body }),

      invalidatesTags: ['Sponsor']
    }),
    updateSponsor: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/update-sponsor`, method: 'PUT', body }),
      invalidatesTags: ['Sponsor']
    }),
    deleteSponsor: build.mutation({
      query: (body) => ({ url: `${BASE_URL}/delete-sponsor`, method: 'DELETE', body }),
      invalidatesTags: ['Sponsor']
    })
  })
})

export const { useFetchSponsorsQuery, useCreateSponsorMutation, useUpdateSponsorMutation, useDeleteSponsorMutation } =
  sponsorApi
