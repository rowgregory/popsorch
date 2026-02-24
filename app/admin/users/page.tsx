'use client'

import { UserProps } from '@/app/redux/features/userSlice'
import { motion } from 'framer-motion'
import AdminUserRow from '@/app/components/admin/AdminUserRow'
import { User } from 'lucide-react'

const Users = ({ data }) => {
  const { noUsers, users } = data

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-neutral-900 to-neutral-950 border-b border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Users</h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-1">Manage user accounts, roles, and permissions</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {noUsers ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-linear-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-12 text-center shadow-xl"
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
    </div>
  )
}

export default Users
