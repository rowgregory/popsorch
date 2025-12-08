import { Reducer, createSlice } from '@reduxjs/toolkit'

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
      state.members = payload.mailchimpMembers
      state.mailchimpMembersCount = payload?.mailchimpMemberCount
      state.noMailchimpMembers = payload?.mailchimpMembersCount === 0
    }
  }
})

export const mailChimpReducer = mailChimpSlice.reducer as Reducer<MailChimpStatePayload>

export const { setMailchimpMembers } = mailChimpSlice.actions
