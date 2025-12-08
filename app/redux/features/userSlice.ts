import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface UserProps {
  id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  isSuperUser: boolean
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface UserStatePayload {
  loading: boolean
  error: any
  success: boolean
  users: UserProps[]
  user: UserProps
  usersCount: number
  noUsers: boolean
}

const userState: UserProps = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  isAdmin: false,
  isSuperUser: false,
  role: '',
  createdAt: new Date(),
  updatedAt: new Date()
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
    },
    removeUserFromState: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    hydrateUserState: (state, { payload }) => {
      state.user = { ...state.user, ...payload }
    }
  }
})

export const userReducer = userSlice.reducer as Reducer<UserStatePayload>

export const { resetUser, setUsers, setUser, resetUserError, removeUserFromState, hydrateUserState } = userSlice.actions
