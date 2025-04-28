import { api } from './api'

const BASE_URL = '/testimonial'

export const testimonialApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchTestimonials: build.query({
      query: () => `${BASE_URL}/fetch-testimonials`,
      providesTags: ['Testimonial']
    }),
    createTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-testimonial`, method: 'POST', body }),
      invalidatesTags: ['Testimonial']
    }),
    updateTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/update-testimonial`, method: 'PUT', body }),
      invalidatesTags: ['Testimonial']
    }),
    deleteTestimonial: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/delete-testimonial`, method: 'DELETE', body }),
      invalidatesTags: ['Testimonial']
    })
  })
})

export const { useFetchTestimonialsQuery, useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation } =
  testimonialApi
