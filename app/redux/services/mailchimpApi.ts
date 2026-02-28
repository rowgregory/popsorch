import { api } from './api'

const BASE_URL = '/mailchimp'

export const mailchimpApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchSubscribers: build.query({
      query: () => `${BASE_URL}/fetch-subscribers`
    }),
    subscribe: build.mutation({
      query: (body: any) => ({
        url: `${BASE_URL}/subscribe`,
        method: 'POST',
        body
      })
    })
  })
})

export const { useFetchSubscribersQuery, useSubscribeMutation } = mailchimpApi
