import { api } from './api'

const BASE_URL = '/metric'

export const metricApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build: any) => ({
    createDailyMetric: build.mutation({
      query: (body: any) => ({ url: `${BASE_URL}/create-daily-metric`, method: 'POST', body }),
      invalidatesTags: ['Metric']
    })
  })
})

export const { useCreateDailyMetricMutation } = metricApi
