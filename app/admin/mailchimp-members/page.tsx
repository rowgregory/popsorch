'use client'

import AdminMailChimpSubscriberRow from '@/app/components/admin/AdminMailChimpSubscriberRow'
import { Users } from 'lucide-react'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'
import { useFetchSubscribersQuery } from '@/app/redux/services/mailchimpApi'

const MailchimpMembers = () => {
  const { data } = useFetchSubscribersQuery(undefined) as any

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-black rounded-xl border border-neutral-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Mailchimp Members</h2>
              <p className="text-neutral-400 text-sm">{data?.totalItems || 0} subscribers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="p-4 space-y-3">
        {data?.members?.map((member: MemberProps) => (
          <AdminMailChimpSubscriberRow key={member.contactId} {...member} />
        ))}
      </div>

      {/* Empty State */}
      {(!data?.members || data?.members?.length === 0) && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <Users className="w-16 h-16 text-neutral-700 mb-4" />
          <p className="text-neutral-400 text-lg font-semibold mb-2">No subscribers yet</p>
          <p className="text-neutral-600 text-sm">Mailchimp members will appear here</p>
        </div>
      )}
    </div>
  )
}

export default MailchimpMembers
