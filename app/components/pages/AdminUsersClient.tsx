'use client'

import { motion } from 'framer-motion'
import { IUser } from '@/app/types/entities/user'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { store } from '@/app/redux/store'
import { setOpenUserDrawer } from '@/app/redux/features/uiSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import { PanelRightOpen } from 'lucide-react'
import { useState } from 'react'

type RoleFilter = 'ALL' | 'SUPER_USER' | 'ADMIN' | 'SUPPORTER'

export const AdminUsersClient = ({ users }) => {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL')

  const filtered = users?.filter((u) => (roleFilter === 'ALL' ? true : u.role === roleFilter)) ?? []

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
        {/* Venues Table */}
        <div className="bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              All Users <span className="ml-2 text-sm font-normal text-neutral-400">({filtered.length})</span>
            </h2>

            <div className="relative">
              <label htmlFor="role-filter" className="sr-only">
                Filter by role
              </label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                className="appearance-none pl-3 pr-8 py-2 text-xs font-medium bg-neutral-800 border border-neutral-700 text-neutral-300 hover:border-neutral-600 transition-colors focus:outline-none focus:ring-1 focus:ring-yellow-400/50 rounded-lg"
              >
                <option value="ALL">All Roles</option>
                <option value="SUPER_USER">Super User</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPPORTER">Supporter</option>
              </select>
              <svg
                viewBox="0 0 24 24"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-950">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
                {filtered?.map((user: IUser, index: number) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-neutral-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-400">{user?.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-400">{formatDateShort(user.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            store.dispatch(setOpenUserDrawer())
                            store.dispatch(setInputs({ formName: 'userForm', data: user }))
                          }}
                          className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <PanelRightOpen size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
