import { addTeamMemberToState, removeTeamMemberFromState, updateTeamMemberInState } from '../features/teamMemberSlice'
import { api } from './api'

const BASE_URL = '/team-member'

export const teamMemberApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchTeamMembers: build.query({
      query: () => `${BASE_URL}/fetch-team-members`
    }),
    createTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-team-member`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addTeamMemberToState(data.teamMember))
      }
    }),
    updateTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-team-member`, method: 'PUT', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateTeamMemberInState(data.teamMember))
      }
    }),
    deleteTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-team-member`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeTeamMemberFromState(arg.id))
      }
    })
  })
})

export const {
  useFetchTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation
} = teamMemberApi
