import { Reducer, createSlice } from '@reduxjs/toolkit'
import { teamMemberApi } from '../services/teamMemberApi'

export interface TeamMemberProps {
  id: string
  firstName: string
  lastName: string
  position: string
  bio: string
  role: string
  imageUrl: string
  imageFilename: string
  createdAt: Date
  updatedAt: Date
}

export interface TeamMemberStatePayload {
  loading: boolean
  error: any
  success: boolean
  teamMembers: TeamMemberProps[]
  teamMember: TeamMemberProps
  teamMembersCount: number
  noTeamMembers: boolean
}

const teamMemberState: TeamMemberProps = {
  id: '',
  firstName: '',
  lastName: '',
  position: '',
  bio: '',
  role: '',
  imageUrl: '',
  imageFilename: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialTeamMemberState: TeamMemberStatePayload = {
  loading: true,
  error: null,
  success: false,
  teamMembers: [],
  teamMember: teamMemberState,
  teamMembersCount: 0,
  noTeamMembers: false
}

export const teamMemberSlice = createSlice({
  name: 'teamMember',
  initialState: initialTeamMemberState,
  reducers: {
    resetTeamMember: (state) => {
      state.error = null
      state.teamMember = teamMemberState
    },
    setTeamMembers: (state, { payload }: any) => {
      state.teamMembers = payload
      state.teamMembersCount = payload?.length
      state.noTeamMembers = payload?.length === 0
    },
    resetTeamMemberError: (state) => {
      state.error = null
    },
    addTeamMemberToState: (state, action) => {
      state.teamMembers.push(action.payload)
      state.teamMembersCount = state.teamMembersCount + 1
      state.noTeamMembers = state.teamMembers.length === 0
    },
    updateTeamMemberInState: (state, action) => {
      const updatedTeamMember = action.payload
      const index = state.teamMembers.findIndex((teamMember) => teamMember.id === updatedTeamMember.id)
      if (index !== -1) {
        state.teamMembers[index] = updatedTeamMember
      }
    },
    removeTeamMemberFromState: (state, action) => {
      state.teamMembers = state.teamMembers.filter((teamMember) => teamMember.id !== action.payload)
      state.teamMembersCount = state.teamMembersCount - 1
      state.noTeamMembers = state.teamMembers.length === 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(teamMemberApi.endpoints.fetchTeamMembers.matchFulfilled, (state, { payload }: any) => {
        state.teamMembers = payload.teamMembers
        state.loading = false
        state.success = true
      })
      .addMatcher(teamMemberApi.endpoints.createTeamMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(teamMemberApi.endpoints.updateTeamMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(teamMemberApi.endpoints.deleteTeamMember.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'teamMemberApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const teamMemberReducer = teamMemberSlice.reducer as Reducer<TeamMemberStatePayload>

export const {
  resetTeamMember,
  setTeamMembers,
  resetTeamMemberError,
  addTeamMemberToState,
  updateTeamMemberInState,
  removeTeamMemberFromState
} = teamMemberSlice.actions
