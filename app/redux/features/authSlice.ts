import { Reducer, createSlice } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'

export interface AuthStatePayload {
  loading: boolean
  success: boolean
  error: { data: { message: string } }
  message: string | null
  isAuthenticated: boolean | null
  userId: string
  status: string
  checks: any
  passwordReset: boolean
}

const errorState = { data: { message: '' } }

export const initialAuthState: AuthStatePayload = {
  loading: true,
  success: false,
  error: errorState,
  message: '',
  isAuthenticated: false,
  userId: '',
  status: '',
  checks: null,
  passwordReset: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuthState: (state, { payload }) => {
      state.isAuthenticated = payload.isAuthenticated
      state.userId = payload.id
    },
    resetAuth: (state) => {
      state.success = false
      state.loading = false
      state.passwordReset = false
    },
    resetAuthError: (state) => {
      state.error = errorState
    },
    resetAuthSuccess: (state) => {
      state.success = false
    },
    resetAuthPasswordReset: (state) => {
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }: any) => {
        state.loading = false
        state.isAuthenticated = payload.isAuthenticated
        state.userId = payload.id
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.userId = ''
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchFulfilled, (state, { payload }) => {
        state.loading = false
        state.userId = payload.id
        state.success = true
      })
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state, { payload }) => {
        state.loading = false
        state.passwordReset = payload.passwordReset
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
          state.error = action.payload.data.message
        }
      )
  }
})

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>

export const { setAuthState, resetAuth, resetAuthError, resetAuthSuccess, resetAuthPasswordReset } = authSlice.actions
