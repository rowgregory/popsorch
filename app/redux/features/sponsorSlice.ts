import { Reducer, createSlice } from '@reduxjs/toolkit'
import { initialSponsorData } from '@/app/lib/initial-state/sponsor'
import { sponsorApi } from '../services/sponsorApi'
import { ISponsor } from '@/app/types/model.types'

interface SponsorStatePayload {
  loading: boolean
  error: any
  success: boolean
  sponsors: ISponsor[]
  sponsor: ISponsor
  sponsorsCount: number
  noSponsors: boolean
  sponsorDrawer: boolean
}

const initialSponsorState: SponsorStatePayload = {
  loading: true,
  error: null,
  success: false,
  sponsors: [],
  sponsor: initialSponsorData,
  sponsorsCount: 0,
  noSponsors: false,
  sponsorDrawer: false
}

export const sponsorSlice = createSlice({
  name: 'sponsor',
  initialState: initialSponsorState,
  reducers: {
    resetSponsor: (state) => {
      state.error = null
      state.sponsor = initialSponsorData
    },
    setSponsors: (state, { payload }: any) => {
      state.sponsors = payload
      state.sponsorsCount = payload?.length
      state.noSponsors = payload?.length === 0
    },
    resetSponsorError: (state) => {
      state.error = null
    },
    setOpenSponsorDrawer: (state) => {
      state.sponsorDrawer = true
    },
    setCloseSponsorDrawer: (state) => {
      state.sponsorDrawer = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(sponsorApi.endpoints.createSponsor.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(sponsorApi.endpoints.updateSponsor.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(sponsorApi.endpoints.fetchSponsors.matchFulfilled, (state, { payload }: any) => {
        state.sponsors = payload.sponsors
        state.loading = false
      })
      .addMatcher(sponsorApi.endpoints.createSponsor.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(sponsorApi.endpoints.updateSponsor.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(sponsorApi.endpoints.deleteSponsor.matchFulfilled, (state) => {
        state.success = true
        state.loading = false
      })
      .addMatcher(
        (action) => action.type.endsWith('rejected') && action.payload?.data?.sliceName === 'sponsorApi',
        (state, { payload }: any) => {
          state.loading = false
          state.error = payload?.data?.message
        }
      )
  }
})

export const sponsorReducer = sponsorSlice.reducer as Reducer<SponsorStatePayload>

export const { resetSponsor, setSponsors, resetSponsorError, setOpenSponsorDrawer, setCloseSponsorDrawer } =
  sponsorSlice.actions
