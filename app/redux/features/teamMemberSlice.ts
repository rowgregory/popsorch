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
  teamMembers: []
  teamMember: TeamMemberProps
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
  teamMember: teamMemberState
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
    },
    resetTeamMemberError: (state) => {
      state.error = null
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

export const { resetTeamMember, setTeamMembers, resetTeamMemberError } = teamMemberSlice.actions
