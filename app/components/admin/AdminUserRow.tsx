import React, { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { removeUserFromState, resetUser, UserProps } from '@/app/redux/features/userSlice'
import { useDeleteUserMutation } from '@/app/redux/services/userApi'
import { useAppDispatch, useUserSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import { decreaseUsersCount } from '@/app/redux/features/appSlice'
import { Calendar, Shield, Trash } from 'lucide-react'

const AdminUserRow: FC<{ user: UserProps }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteUser] = useDeleteUserMutation()
  const {
    user: { id }
  } = useUserSelector()

  const handleUserDelete = async (e: any, userId: string) => {
    e.stopPropagation()

    try {
      setLoading((prev) => ({ ...prev, [userId]: true }))
      const response = await deleteUser({ id: userId }).unwrap()
      dispatch(removeUserFromState(response.id))
      dispatch(resetUser())
      dispatch(decreaseUsersCount())
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'editor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'viewer':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
  }

  const isProtected = user?.email === 'sqysh@sqysh.io' || id === user?.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="group bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-xl p-4 hover:border-neutral-700/70 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {getInitials(user?.firstName, user?.lastName)}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Name */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-neutral-400 truncate">{user?.email}</p>
          </div>

          {/* Role Badge */}
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getRoleBadgeColor(
                user?.role
              )}`}
            >
              {user?.role || 'User'}
            </span>
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span className="text-xs text-neutral-400">{formatDate(user?.updatedAt)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2">
            {isProtected ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800/50 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs text-neutral-400 font-medium">Protected</span>
              </div>
            ) : (
              <>
                {loading[user?.id] ? (
                  <div className="w-9 h-9 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                ) : (
                  <button
                    onClick={(e) => handleUserDelete(e, user?.id)}
                    className="p-2 bg-neutral-800/50 hover:bg-red-500/20 border border-transparent hover:border-red-500/50 rounded-lg transition-all group/delete"
                    title="Delete user"
                  >
                    <Trash className="w-4 h-4 text-neutral-400 group-hover/delete:text-red-500 transition-colors" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminUserRow
