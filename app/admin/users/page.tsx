'use client'

import React from 'react'
import { useUserSelector } from '@/app/redux/store'
import { UserProps } from '@/app/redux/features/userSlice'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminUserRow from '@/app/components/admin/AdminUserRow'
import { useFetchUsersQuery } from '@/app/redux/services/userApi'

const Users = () => {
  const { data, isLoading } = useFetchUsersQuery(undefined) as any
  const { noUsers } = useUserSelector()

  return (
    <div className="p-6">
      {isLoading ? (
        <AdminPageSpinner fill="fill-emerald-400" />
      ) : noUsers ? (
        <div className="font-sm font-lato">No Users</div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-[2fr_2fr_2fr_2fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-2 pr-2 mb-3 text-sm min-w-[600px]">
              <div className="whitespace-nowrap">First Name</div>
              <div className="whitespace-nowrap">Last Name</div>
              <div className="whitespace-nowrap">Email</div>
              <div className="whitespace-nowrap">Role</div>
              <div className="whitespace-nowrap">Date & Time</div>
              <div></div>
            </div>
            <div className="flex flex-col gap-y-3 min-w-[600px]">
              {data?.users?.map((user: UserProps) => (
                <AdminUserRow key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
