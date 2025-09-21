import { Reducer, createSlice } from '@reduxjs/toolkit'

export interface QuoteStatePayload {
  loading: boolean
  success: boolean
  error: { data: { message: string } }
  message: string | null
  quotes: []
  quote: object | any
}

const errorState = { data: { message: '' } }

export const initialQuoteState: QuoteStatePayload = {
  loading: false,
  success: false,
  error: errorState,
  message: '',
  quotes: [],
  quote: {}
}

export const quoteSlice = createSlice({
  name: 'quote',
  initialState: initialQuoteState,
  reducers: {
    setQuotes: (state, { payload }) => {
      state.quotes = payload
    },
    setQuote: (state, { payload }) => {
      state.quote = payload
    },
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setSuccess: (state, { payload }) => {
      state.success = payload
    },
    setMessage: (state, { payload }) => {
      state.message = payload
    },
    clearQuoteState: (state) => {
      state.loading = false
      state.success = false
      state.error = errorState
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action: any) => action.type.endsWith('/pending') && action.payload?.data?.sliceName === 'quoteApi',
      (state) => {
        state.loading = true
        state.success = false
        state.error = errorState
      }
    )
    builder.addMatcher(
      (action: any) => action.type.endsWith('/fulfilled') && action.payload?.data?.sliceName === 'quoteApi',
      (state, action: any) => {
        state.loading = false
        state.success = true
        state.message = action.payload.data.message || 'Quote submitted successfully'
      }
    )
    builder.addMatcher(
      (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'quoteApi',
      (state, action: any) => {
        state.loading = false
        state.success = false
        state.error = action.payload.data.message
      }
    )
  }
})

export const quoteReducer = quoteSlice.reducer as Reducer<QuoteStatePayload>

export const { setQuotes, setQuote, setLoading, setSuccess, setMessage, clearQuoteState } = quoteSlice.actions
