import { api } from './api'

const BASE_URL = '/quote'

export const quoteApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    submitQuote: build.mutation({
      query: (body: { name: string; companyName: string; email: string; phone: string; message: string }) => ({
        url: `${BASE_URL}/create-quote`,
        method: 'POST',
        body: {
          name: body.name,
          companyName: body.companyName,
          email: body.email,
          phone: body.phone,
          message: body.message
        }
      }),
      invalidatesTags: ['Quote']
    })
  })
})

export const { useSubmitQuoteMutation } = quoteApi
