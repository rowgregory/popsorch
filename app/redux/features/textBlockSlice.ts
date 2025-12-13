import { Reducer, createSlice } from '@reduxjs/toolkit'

export const initialTextBlockState = {
  textBlockMap: {},
  textBlockDeleted: false,
  success: false,
  loading: true,
  error: null,
  message: null,
  status: '',
  systemStatus: {},
  concerts: [],
  testimonials: [],
  photoGalleryImages: [],
  teamMembers: []
}

export const textBlockSlice = createSlice({
  name: 'textBlock',
  initialState: initialTextBlockState,
  reducers: {
    setTextBlocks: (state, { payload }: any) => {
      state.loading = false
      const combinedTextBlocks = {
        ...state.textBlockMap,
        ...payload
      }

      state.textBlockMap = combinedTextBlocks
    },
    updateTextBlockInState(state: any, action) {
      const { key, value, type } = action.payload
      state.textBlockMap[type] = { ...state.textBlockMap[type], [key]: value }
    }
  }
})

export const textBlockReducer = textBlockSlice.reducer as Reducer

export const { setTextBlocks, updateTextBlockInState } = textBlockSlice.actions
