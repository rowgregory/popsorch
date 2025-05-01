import { api } from './api'

const BASE_URL = '/metric'

export const metricApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    fetchMetrics: build.query({
      query: () => `${BASE_URL}/fetch-metrics`,
      providesTags: ['Metric']
    }),
    increaseAppCount: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/increase-app-count`, method: 'POST', body }),
      invalidatesTags: ['Metric']
    })
  })
})

export const { useFetchMetricsQuery, useIncreaseAppCountMutation } = metricApi
