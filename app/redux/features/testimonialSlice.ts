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
  testimonials: TestimonialProps[]
  testimonial: TestimonialProps
  testimonialsCount: number
  noTestimonials: boolean
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
  testimonial: testimonialState,
  testimonialsCount: 0,
  noTestimonials: false
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
      state.testimonialsCount = payload?.length
      state.noTestimonials = payload?.length === 0
    },
    resetTestimonialError: (state) => {
      state.error = null
    },
    updateTestimonialInState: (state, action) => {
      const updatedTestimonial = action.payload
      const index = state.testimonials.findIndex((testimonial) => testimonial.id === updatedTestimonial.id)
      if (index !== -1) {
        state.testimonials[index] = updatedTestimonial // Replace the old testimonial with the updated one
      }
    },
    addTestimonialToState: (state, action) => {
      state.testimonials.push(action.payload) // Add the new testimonial to the list
      state.testimonialsCount = state.testimonialsCount + 1
      state.noTestimonials = state.testimonials.length === 0
    },
    removeTestimonialFromState: (state, action) => {
      state.testimonials = state.testimonials.filter((testimonial) => testimonial.id !== action.payload)
      state.testimonialsCount = state.testimonialsCount - 1
      state.noTestimonials = state.testimonials.length === 0
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

export const {
  resetTestimonial,
  setTestimonials,
  resetTestimonialError,
  updateTestimonialInState,
  addTestimonialToState,
  removeTestimonialFromState
} = testimonialSlice.actions
