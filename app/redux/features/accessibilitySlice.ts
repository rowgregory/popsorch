import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface AccessibilityStatePayload {
  accessibility: boolean
  highContrast: boolean
  highlightLinks: boolean
  stepIndex: number
  textSpacing: boolean
  dyslexiaFriendly: boolean
  lineHeight: boolean
}

const initialAccessibilityState: AccessibilityStatePayload = {
  accessibility: false,
  highContrast: false,
  highlightLinks: false,
  stepIndex: 0,
  textSpacing: false,
  dyslexiaFriendly: false,
  lineHeight: false
}

export const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState: initialAccessibilityState,
  reducers: {
    setAccessibilitySettings: (state, { payload }) => {
      state.highContrast = payload.highContrast
      state.highlightLinks = payload.highlightLinks
      state.stepIndex = payload.stepIndex
      state.textSpacing = payload.textSpacing
      state.dyslexiaFriendly = payload.dyslexiaFriendly
      state.lineHeight = payload.lineHeight
    },
    setToggleAccessibilityDrawer: (state, { payload }) => {
      state.accessibility = !payload
    }
  }
})

export const accessibilityReducer = accessibilitySlice.reducer as Reducer<AccessibilityStatePayload>

export const { setAccessibilitySettings, setToggleAccessibilityDrawer } = accessibilitySlice.actions
