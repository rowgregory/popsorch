import {
  addHeaderButtonToState,
  hydrateHeaderButton,
  removeHeaderButtonFromState,
  updateHeaderButtonInState
} from '../features/headerButtonSlice'
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
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addHeaderButtonToState(data.headerButton))
      }
    }),
    assignHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/assign-header-button`, method: 'PUT', body }),
      invalidatesTags: ['Header-Button'],
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(hydrateHeaderButton(data.headerButton))
      }
    }),
    deleteHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-header-button`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled

        dispatch(removeHeaderButtonFromState(data.id))
      }
    }),
    updateHeaderButton: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-header-button`, method: 'PUT', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled

        dispatch(updateHeaderButtonInState(data.headerButton))
        dispatch(hydrateHeaderButton(data.headerButton))
      }
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
