import { Reducer, createSlice } from '@reduxjs/toolkit'
import { mailchimpApi } from '../services/mailchimpApi'

export interface MailChimpStatePayload {
  loading: boolean
  success: boolean
  error: any
  message: string | null
  members: MemberProps[]
  totalItems: any
  mailchimpMembersCount: number
  noMailchimpMembers: boolean
}

export const initialMailChimpState: MailChimpStatePayload = {
  loading: true,
  success: false,
  error: '',
  message: '',
  members: [],
  totalItems: 0,
  mailchimpMembersCount: 0,
  noMailchimpMembers: false
}

export type StatusEnum = 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'non_member' | 'archived'

export interface MemberProps {
  contactId: string
  name: string
  email: string
  phoneNumber: string
  createdAt: string
  status: StatusEnum
  interests: Array<Interest>
  address: Address
  stats: Stat
  ipOpt: string
}

interface Stat {
  avgOpenRate: string
  avgClickRate: string
}

interface Interest {
  type: string
}

interface Address {
  addr1: string
  city: string
  state: string
  zip: string
}

export const mailChimpSlice = createSlice({
  name: 'mailChimp',
  initialState: initialMailChimpState,
  reducers: {
    setMailchimpMembers: (state, { payload }) => {
      state.members = payload.members
      state.mailchimpMembersCount = payload?.mailchimpMembersCount
      state.noMailchimpMembers = payload?.mailchimpMembersCount === 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(mailchimpApi.endpoints.fetchSubscribers.matchFulfilled, (state, { payload }: any) => {
        state.loading = false
        state.members = payload.members
        state.totalItems = payload.totalItems
        state.mailchimpMembersCount = payload.totalItems
        state.noMailchimpMembers = payload.totalItems === 0
      })
      .addMatcher(mailchimpApi.endpoints.subscribe.matchFulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addMatcher(mailchimpApi.endpoints.unsubscribe.matchFulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected') && action.payload?.data?.sliceName === 'mailchimpApi',
        (state, action: any) => {
          state.loading = false
          state.error = action.payload.data.message
        }
      )
  }
})

export const mailChimpReducer = mailChimpSlice.reducer as Reducer<MailChimpStatePayload>

export const { setMailchimpMembers } = mailChimpSlice.actions
