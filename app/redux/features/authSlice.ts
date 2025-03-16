import { Reducer, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'

export interface AuthStatePayload {
  loading: boolean
  success: boolean
  error: string | false | null
  message: string | null
  isAuthenticated: boolean | null
  userId?: string
  forgotPasswordCredentialsValid: boolean
  toggleForgotPasswordForm: boolean
  toggleResetPasswordForm: boolean
  role: string
  status: string
  checks: any
}

export const initialAuthState: AuthStatePayload = {
  loading: false,
  success: false,
  error: null,
  message: '',
  isAuthenticated: false,
  userId: '',
  forgotPasswordCredentialsValid: false,
  toggleForgotPasswordForm: true,
  toggleResetPasswordForm: false,
  role: '',
  status: '',
  checks: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuthState(state, { payload }) {
      state.isAuthenticated = payload.isAuthenticated
      state.userId = payload.userId
      state.role = payload.role
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.success = true
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }: any) => {
        state.isAuthenticated = payload.isAuthenticated
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.success = true
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchFulfilled, (state) => {
        state.toggleForgotPasswordForm = false
        state.toggleResetPasswordForm = false
      })
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state) => {
        state.success = true
      })
      .addMatcher(authApi.endpoints.authSystemStatus.matchFulfilled, (state, { payload }: any) => {
        state.status = payload.status
        state.message = payload.message
        state.checks = payload.checks
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'authApi',
        (state, action: any) => {
          state.loading = false
          state.error = action.payload.data
        }
      )
  }
})

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>

export const { setAuthState } = authSlice.actions
