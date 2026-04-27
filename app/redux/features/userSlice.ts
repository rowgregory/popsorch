import { User } from '@prisma/client'
import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UserStatePayload {
  loading: boolean
  error: any
  success: boolean
  users: User[]
  user: User
  usersCount: number
  noUsers: boolean
}

const userState: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  isSoundEffectsOn: false,
  role: 'PATRON',
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: undefined,
  phone: '',
  stripeCustomerId: ''
}

const initialUserState: UserStatePayload = {
  loading: true,
  error: null,
  success: false,
  users: [],
  user: userState,
  usersCount: 0,
  noUsers: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    resetUser: (state) => {
      state.error = null
      state.user = userState
    },
    setUsers: (state, { payload }) => {
      state.users = payload
      state.usersCount = payload?.length
      state.noUsers = payload?.length === 0
    },
    setUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    },
    resetUserError: (state) => {
      state.error = null
    }
  }
})

export const userReducer = userSlice.reducer as Reducer<UserStatePayload>

export const { resetUser, setUsers, setUser, resetUserError } = userSlice.actions
