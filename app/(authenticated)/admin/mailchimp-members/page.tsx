'use client'

import AdminMailChimpSubscriberRow from '@/app/components/admin/AdminMailChimpSubscriberRow'
import { Users } from 'lucide-react'
import { MemberProps } from '@/app/redux/features/mailchimpSlice'
import { useFetchSubscribersQuery } from '@/app/redux/services/mailchimpApi'
import { motion } from 'framer-motion'

const MailchimpMembers = () => {
  const { data, isLoading } = useFetchSubscribersQuery(undefined)
  const { totalItems = 0, members = [] } = (data as { totalItems: number; members: any }) || {}

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-66px)]">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-12 h-12 rounded-full border-4 border-neutral-700 border-t-yellow-500 animate-spin mb-4" />
          <p className="text-neutral-400 text-lg font-semibold">Tapping into Mailchimp DB...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-66px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Mailchimp Members<span className="pl-3 text-base">{totalItems}</span>{' '}
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-1">
                View and manage your Mailchimp audience and mailing list subscribers
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Members List */}
        {members.length > 0 ? (
          <div className="p-4 space-y-3">
            {members.map((member: MemberProps) => (
              <AdminMailChimpSubscriberRow key={member.contactId} {...member} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Users className="w-16 h-16 text-neutral-700 mb-4" />
            <p className="text-neutral-400 text-lg font-semibold mb-2">No subscribers yet</p>
            <p className="text-neutral-600 text-sm">Mailchimp members will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MailchimpMembers
