import { addSponsorToState, removeSponsorFromState, updateSponsorInState } from '../features/sponsorSlice'
import { api } from './api'

const BASE_URL = '/sponsor'

export const sponsorApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchSponsors: build.query({
      query: () => `${BASE_URL}/fetch-sponsors`
    }),
    createSponsor: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-sponsor`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addSponsorToState(data.sponsor))
      }
    }),
    updateSponsor: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-sponsor`, method: 'PUT', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateSponsorInState(data.sponsor))
      }
    }),
    deleteSponsor: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-sponsor`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeSponsorFromState(arg.id))
      }
    })
  })
})

export const { useFetchSponsorsQuery, useCreateSponsorMutation, useUpdateSponsorMutation, useDeleteSponsorMutation } =
  sponsorApi
