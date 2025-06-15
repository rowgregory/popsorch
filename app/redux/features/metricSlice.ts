import { Reducer, createSlice } from '@reduxjs/toolkit'
import { metricApi } from '../services/metricApi'

export interface MetricStatePayload {
  loading: boolean
  success: boolean
  error: { data: { message: string } }
  message: string | null
  metrics: []
  metric: object | any
}

const errorState = { data: { message: '' } }

export const initialMetricState: MetricStatePayload = {
  loading: true,
  success: false,
  error: errorState,
  message: '',
  metrics: [],
  metric: {}
}

export const metricSlice = createSlice({
  name: 'metric',
  initialState: initialMetricState,
  reducers: {
    setMetrics: (state, { payload }) => {
      state.metrics = payload
    },
    resetMetric: (state) => {
      state.success = false
      state.loading = false
    },
    resetMetricError: (state) => {
      state.error = errorState
    },
    resetMetricSuccess: (state) => {
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(metricApi.endpoints.createDailyMetric.matchFulfilled, (state, { payload }: any) => {
        state.loading = false
        state.success = true
        state.metrics = payload.metrics
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'metricApi',
        (state, action: any) => {
          state.loading = false
          state.error = action.payload.data.message
        }
      )
  }
})

export const metricReducer = metricSlice.reducer as Reducer<MetricStatePayload>

export const { setMetrics, resetMetric, resetMetricError, resetMetricSuccess } = metricSlice.actions
