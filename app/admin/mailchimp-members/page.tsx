'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'
import AdminMailChimpSubscriberRow from '@/app/components/admin/AdminMailChimpSubscriberRow'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'

const MailchimpMembers = () => {
  const { members } = useAppSelector((state: RootState) => state.mailchimp)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="p-6">
      {loading ? (
        <AdminPageSpinner fill="fill-lime-500" />
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">Name</div>
              <div className="whitespace-nowrap">Email</div>
              <div className="whitespace-nowrap">Phone Number</div>
              <div className="whitespace-nowrap">Date & time</div>
              <div className="whitespace-nowrap text-center">Status</div>
              <div className="whitespace-nowrap text-center">Mailchimp</div>
            </div>
            <div className="flex flex-col gap-y-2 min-w-[600px]">
              {members?.map((member: MemberProps) => (
                <AdminMailChimpSubscriberRow key={member.contactId} {...member} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MailchimpMembers
