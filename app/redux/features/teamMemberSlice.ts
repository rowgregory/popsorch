import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface TeamMemberProps {
  id: string
  firstName: string
  lastName: string
  position: string
  bio: string
  role: string
  imageUrl: string
  imageFilename: string
  displayOrder: any
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
  staff: any[]
  boardMembers: any[]
  musicians: any[]
  teamMemberDrawer: boolean
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
  displayOrder: 0,
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
  noTeamMembers: false,
  staff: [],
  musicians: [],
  boardMembers: [],
  teamMemberDrawer: false
}

export const teamMemberSlice = createSlice({
  name: 'teamMember',
  initialState: initialTeamMemberState,
  reducers: {
    resetTeamMember: (state) => {
      state.error = null
      state.teamMember = teamMemberState
    },
    setTeamMembers: (state, { payload }) => {
      state.teamMembers = payload
      state.teamMembersCount = payload?.length
      state.noTeamMembers = payload?.length === 0
    },
    setStaff: (state, { payload }) => {
      const sortedMembers = [...payload].sort((a, b) => a.displayOrder - b.displayOrder)
      state.staff = sortedMembers
    },
    setBoardMembers: (state, { payload }) => {
      const sortedMembers = [...payload].sort((a, b) => a.displayOrder - b.displayOrder)
      state.boardMembers = sortedMembers
    },
    setMusicians: (state, { payload }) => {
      const sortedMembers = [...payload].sort((a, b) => a.displayOrder - b.displayOrder)
      state.musicians = sortedMembers
    },
    resetTeamMemberError: (state) => {
      state.error = null
    },
    addTeamMemberToState: (state, { payload }) => {
      state.teamMembers.push(payload)
      state.teamMembersCount = state.teamMembersCount + 1
      state.noTeamMembers = state.teamMembers.length === 0

      // Add to specific array based on memberType
      if (payload.role === 'Staff') {
        state.staff.push(payload)
      } else if (payload.role === 'Board-Member') {
        state.boardMembers.push(payload)
      } else if (payload.role === 'Musician') {
        state.musicians.push(payload)
      }
    },
    updateTeamMemberInState: (state, { payload }) => {
      // Remove from all arrays first
      state.staff = state.staff.filter((member) => member.id !== payload.id)
      state.boardMembers = state.boardMembers.filter((member) => member.id !== payload.id)
      state.musicians = state.musicians.filter((member) => member.id !== payload.id)

      // Add to correct array based on memberType
      if (payload.role === 'Staff') {
        state.staff.push(payload)
      } else if (payload.role === 'Board-Member') {
        state.boardMembers.push(payload)
      } else if (payload.role === 'Musician') {
        state.musicians.push(payload)
      }
    },
    updateTeamMemberListInState: (state, { payload }) => {
      const { savedStaff, savedBoardMembers, savedMusicians } = payload

      // Combine all updated members
      const allUpdatedMembers = [...(savedStaff || []), ...(savedBoardMembers || []), ...(savedMusicians || [])]

      // Create a map for quick lookup
      const updatedMap = new Map(allUpdatedMembers.map((member) => [member.id, member]))

      // Update state
      state.teamMembers = state.teamMembers.map((member) =>
        updatedMap.has(member.id) ? updatedMap.get(member.id)! : member
      )
    },
    removeTeamMemberFromState: (state, { payload }) => {
      // Remove from main array
      state.teamMembers = state.teamMembers.filter((teamMember) => teamMember.id !== payload)

      // Remove from specific arrays
      state.staff = state.staff.filter((member) => member.id !== payload)
      state.boardMembers = state.boardMembers.filter((member) => member.id !== payload)
      state.musicians = state.musicians.filter((member) => member.id !== payload)

      // Update counts
      state.teamMembersCount = state.teamMembers.length
      state.noTeamMembers = state.teamMembers.length === 0
    },
    setOpenTeamMemberDrawer: (state) => {
      state.teamMemberDrawer = true
    },
    setCloseTeamMemberDrawer: (state) => {
      state.teamMemberDrawer = false
    }
  }
})

export const teamMemberReducer = teamMemberSlice.reducer as Reducer<TeamMemberStatePayload>

export const {
  resetTeamMember,
  setTeamMembers,
  resetTeamMemberError,
  addTeamMemberToState,
  updateTeamMemberInState,
  updateTeamMemberListInState,
  removeTeamMemberFromState,
  setStaff,
  setBoardMembers,
  setMusicians,
  setOpenTeamMemberDrawer,
  setCloseTeamMemberDrawer
} = teamMemberSlice.actions
