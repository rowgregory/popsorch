import { Reducer, createSlice } from '@reduxjs/toolkit'
import { testimonialApi } from '../services/testimonialApi'

export interface TestimonialProps {
  id: string
  name: string
  review: string
  createdAt: Date
  updatedAt: Date
}

export interface TestimonialStatePayload {
  loading: boolean
  error: any
  success: boolean
  testimonials: []
  testimonial: TestimonialProps
}

const testimonialState: TestimonialProps = {
  id: '',
  name: '',
  review: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const initialTestimonialState: TestimonialStatePayload = {
  loading: true,
  error: null,
  success: false,
  testimonials: [],
  testimonial: testimonialState
}

export const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState: initialTestimonialState,
  reducers: {
    resetTestimonial: (state) => {
      state.error = null
      state.testimonial = testimonialState
    },
    setTestimonials: (state, { payload }: any) => {
      state.testimonials = payload
    },
    resetTestimonialError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(testimonialApi.endpoints.fetchTestimonials.matchFulfilled, (state, { payload }: any) => {
        state.testimonials = payload.testimonials
        state.loading = false
      })
      .addMatcher(testimonialApi.endpoints.createTestimonial.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(testimonialApi.endpoints.updateTestimonial.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(testimonialApi.endpoints.deleteTestimonial.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'testimonialApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const testimonialReducer = testimonialSlice.reducer as Reducer<TestimonialStatePayload>

export const { resetTestimonial, setTestimonials, resetTestimonialError } = testimonialSlice.actions
