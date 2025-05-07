import { api } from './api'
import {
  addTestimonialToState,
  removeTestimonialFromState,
  updateTestimonialInState
} from '../features/testimonialSlice'

const BASE_URL = '/testimonial'

export const testimonialApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchTestimonials: build.query({
      query: () => `${BASE_URL}/fetch-testimonials`
    }),
    createTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-testimonial`, method: 'POST', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(addTestimonialToState(data.testimonial))
      }
    }),
    updateTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-testimonial`, method: 'PUT', body }),
      onQueryStarted: async (_: any, { dispatch, queryFulfilled }: any) => {
        const { data } = await queryFulfilled
        dispatch(updateTestimonialInState(data.testimonial))
      }
    }),
    deleteTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-testimonial`, method: 'DELETE', body }),
      onQueryStarted: async (arg: any, { dispatch, queryFulfilled }: any) => {
        await queryFulfilled
        dispatch(removeTestimonialFromState(arg.id))
      }
    })
  })
})

export const {
  useFetchTestimonialsQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation
} = testimonialApi
