'use client'

import React from 'react'
import { useUserSelector } from '@/app/redux/store'
import { UserProps } from '@/app/redux/features/userSlice'
import { motion } from 'framer-motion'
import AdminUserRow from '@/app/components/admin/AdminUserRow'
import { User } from 'lucide-react'

const Users = () => {
  const { noUsers, users } = useUserSelector()

  return (
    <div className="p-4 sm:p-6">
      {noUsers ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-12 text-center shadow-xl"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center">
              <User className="w-8 h-8 text-neutral-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">No Users Found</h3>
              <p className="text-sm text-neutral-400">There are currently no users in the system.</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {users?.map((user: UserProps, index: number) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AdminUserRow user={user} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
