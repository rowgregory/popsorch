import { api } from './api'

const BASE_URL = '/team-member'

export const teamMemberApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchTeamMembers: build.query({
      query: () => `${BASE_URL}/fetch-team-members`,
      providesTags: ['Team-Member']
    }),
    createTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-team-member`, method: 'POST', body }),
      invalidatesTags: ['Team-Member', 'App']
    }),
    updateTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-team-member`, method: 'PUT', body }),
      invalidatesTags: ['Team-Member', 'App']
    }),
    deleteTeamMember: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-team-member`, method: 'DELETE', body }),
      invalidatesTags: ['Team-Member', 'App']
    }),
    updateTeamMemberList: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-team-member-list`, method: 'PUT', body }),
      invalidatesTags: ['Team-Member', 'App']
    })
  })
})

export const {
  useFetchTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useUpdateTeamMemberListMutation
} = teamMemberApi
