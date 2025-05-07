'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { resetUserError, UserProps } from '@/app/redux/features/userSlice'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminUserRow from '@/app/components/admin/AdminUserRow'

const Users = () => {
  const { error, users, noUsers, usersCount } = useAppSelector((state: RootState) => state.user)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <>
      <ToastMessage message={error} resetError={() => resetUserError()} />
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Users" total={usersCount} bgcolor="bg-emerald-400" textcolor="text-emerald-400" />
      </div>
      {loading ? (
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
              {users?.map((user: UserProps) => (
                <AdminUserRow key={user.id} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Users
