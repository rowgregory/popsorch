import { Reducer, createSlice } from '@reduxjs/toolkit'
import { ISponsor } from '@/app/types/entities/sponsor'
import { sponsorData } from '@/app/lib/initial-state/sponsor'

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
  sponsor: sponsorData,
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
      state.sponsor = sponsorData
    },
    setSponsors: (state, { payload }) => {
      state.sponsors = payload
      state.sponsorsCount = payload?.length
      state.noSponsors = payload?.length === 0
    },
    resetSponsorError: (state) => {
      state.error = null
    },
    addSponsorToState: (state, { payload }) => {
      state.sponsors.push(payload)
      state.sponsorsCount = state.sponsorsCount + 1
      state.noSponsors = state.sponsors.length === 0
    },
    updateSponsorInState: (state, { payload }) => {
      const index = state.sponsors.findIndex((sponsor) => sponsor.id === payload.id)

      if (index !== -1) {
        state.sponsors[index] = payload
      }
    },
    removeSponsorFromState: (state, { payload }) => {
      state.sponsors = state.sponsors.filter((sponsor) => sponsor.id !== payload)
      state.sponsorsCount = state.sponsorsCount - 1
      state.noSponsors = state.sponsors.length === 0
    },
    setOpenSponsorDrawer: (state) => {
      state.sponsorDrawer = true
    },
    setCloseSponsorDrawer: (state) => {
      state.sponsorDrawer = false
    }
  }
})

export const sponsorReducer = sponsorSlice.reducer as Reducer<SponsorStatePayload>

export const {
  resetSponsor,
  setSponsors,
  resetSponsorError,
  addSponsorToState,
  removeSponsorFromState,
  updateSponsorInState,
  setOpenSponsorDrawer,
  setCloseSponsorDrawer
} = sponsorSlice.actions
