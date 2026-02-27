import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface HeaderButtonProps {
  secondaryButton: any
  id: string
  animation: string
  backgroundColor: string
  fontColor: string
  text: string
  linkType: string
  link: string
  type: string
  dropdownItems: []
  createdAt: Date
  updatedAt: Date
}

export interface HeaderButtonStatePayload {
  loading: boolean
  error: any
  success: boolean
  headerButtons: HeaderButtonProps[]
  headerButton: HeaderButtonProps
  headerButtonsCount: number
  noHeaderButtons: boolean
  successUpdate: boolean
}

const headerButtonState: HeaderButtonProps = {
  id: '',
  animation: '',
  backgroundColor: '',
  fontColor: '',
  text: '',
  linkType: '',
  link: '',
  type: '',
  dropdownItems: [],
  secondaryButton: null,
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialHeaderButtonState: HeaderButtonStatePayload = {
  loading: true,
  error: null,
  success: false,
  headerButtons: [],
  headerButton: headerButtonState,
  headerButtonsCount: 0,
  noHeaderButtons: false,
  successUpdate: false
}

export const headerButtonSlice = createSlice({
  name: 'headerButton',
  initialState: initialHeaderButtonState,
  reducers: {
    resetHeaderButton: (state) => {
      state.error = null
      state.headerButton = headerButtonState
    },
    setHeaderButtons: (state, { payload }: any) => {
      state.headerButtons = payload
      state.headerButtonsCount = payload?.length
      state.noHeaderButtons = payload?.length === 0
    },
    resetHeaderButtonError: (state) => {
      state.error = null
    },
    addHeaderButtonToState: (state, action) => {
      state.headerButtons.push(action.payload)
      state.headerButtonsCount = state.headerButtonsCount + 1
      state.noHeaderButtons = state.headerButtons.length === 0
    },
    updateHeaderButtonInState: (state, action) => {
      const updatedHeaderButton = action.payload
      const index = state.headerButtons.findIndex((headerButton) => headerButton.id === updatedHeaderButton.id)
      if (index !== -1) {
        state.headerButtons[index] = updatedHeaderButton
      }
    },
    removeHeaderButtonFromState: (state, action) => {
      state.headerButtons = state.headerButtons.filter((headerButton) => headerButton.id !== action.payload)
      state.headerButtonsCount = state.headerButtonsCount - 1
      state.noHeaderButtons = state.headerButtons.length === 0
    },
    hydrateHeaderButton: (state, { payload }) => {
      state.headerButton = payload
    },
    resetSuccessUpdate: (state) => {
      state.successUpdate = false
    }
  }
})

export const headerButtonReducer = headerButtonSlice.reducer as Reducer<HeaderButtonStatePayload>

export const {
  resetHeaderButton,
  setHeaderButtons,
  resetHeaderButtonError,
  addHeaderButtonToState,
  updateHeaderButtonInState,
  removeHeaderButtonFromState,
  hydrateHeaderButton,
  resetSuccessUpdate
} = headerButtonSlice.actions
