'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'
import AdminMailChimpSubscriberRow from '@/app/components/admin/AdminMailChimpSubscriberRow'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'

const MailchimpMembers = () => {
  const { totalItems, members, loading } = useAppSelector((state: RootState) => state.mailchimp)

  return (
    <>
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal
          title="Mailchimp Members"
          total={totalItems}
          bgcolor="bg-lime-500"
          textcolor="text-lime-500"
        />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-lime-500" />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-3 whitespace-nowrap overflow-hidden -ml-2">Name</div>
              <div className="col-span-2 whitespace-nowrap overflow-hidden">Email</div>
              <div className="col-span-2 whitespace-nowrap overflow-hidden">Phone Number</div>
              <div className="col-span-2 whitespace-nowrap overflow-hidden">Date & time</div>
              <div className="col-span-2 whitespace-nowrap overflow-hidden text-center">Status</div>
              <div className="col-span-1 whitespace-nowrap overflow-hidden text-center">Mailchimp</div>
            </div>
            <div className="flex flex-col gap-y-2">
              {members?.map((member: MemberProps) => (
                <AdminMailChimpSubscriberRow key={member.contactId} {...member} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MailchimpMembers
