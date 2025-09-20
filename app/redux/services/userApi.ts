import { api } from './api'

const BASE_URL = '/user'

export const userApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchUsers: build.query({
      query: () => `${BASE_URL}/fetch-users`,
      providesTags: ['User']
    }),
    updateUserRole: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-user-role`, method: 'PUT', body }),
      invalidatesTags: ['User']
    }),
    updateUserProfile: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-user-profile`, method: 'PUT', body }),
      invalidatesTags: ['User']
    }),
    deleteUser: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-user`, method: 'DELETE', body }),
      invalidatesTags: ['User']
    })
  })
})

export const { useFetchUsersQuery, useUpdateUserRoleMutation, useUpdateUserProfileMutation, useDeleteUserMutation } =
  userApi
