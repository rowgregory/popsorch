import { Reducer, createSlice } from '@reduxjs/toolkit'

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
      state.isAuthenticated = payload
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
  }
})

export const authReducer = authSlice.reducer as Reducer<AuthStatePayload>

export const { setAuthState, resetAuth, resetAuthError, resetAuthSuccess, resetAuthPasswordReset } = authSlice.actions
