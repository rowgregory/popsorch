import { api } from './api'

const BASE_URL = '/auth'

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    register: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/register`,
        method: 'POST',
        body
      })
    }),
    logout: build.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: 'POST'
      })
    }),
    login: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/login`,
        method: 'POST',
        body
      })
    }),
    forgotPassword: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/forgot-password`,
        method: 'POST',
        body
      })
    }),
    resetPassword: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/reset-password`,
        method: 'PATCH',
        body
      })
    }),
    authSystemStatus: build.query({
      query: () => `${BASE_URL}/system-status`,
      providesTags: ['Service'],
      keepUnusedDataFor: 0
    })
  })
})

export const {
  useRegisterMutation,
  useLogoutMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useAuthSystemStatusQuery
} = authApi
