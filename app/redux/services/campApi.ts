import { addCampApplicationToState, removeCampApplicationFromState } from '../features/campSlice'
import { api } from './api'

const BASE_URL = '/camp'

export const campApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchCampApplications: build.query({
      query: () => `${BASE_URL}/fetch-camp-applications`
    }),
    createCampApplication: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-camp-application`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addCampApplicationToState(data.campApplication))
      }
    }),
    deleteCampApplication: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-camp-application`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(removeCampApplicationFromState(data.deletedIds))
      }
    })
  })
})

export const { useCreateCampApplicationMutation, useDeleteCampApplicationMutation, useFetchCampApplicationsQuery } =
  campApi
