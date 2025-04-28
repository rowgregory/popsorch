'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import { resetUserError, UserProps } from '@/app/redux/features/userSlice'
import ToastMessage from '@/app/components/common/ToastMessage'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminUserRow from '@/app/components/admin/AdminUserRow'

const Users = () => {
  const { users, error } = useAppSelector((state: RootState) => state.user)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="relative">
      <ToastMessage message={error} resetError={() => resetUserError()} />
      <div className="mb-12 sticky top-0 bg-duskgray z-20 py-2">
        <AdminTitleAndTotal title="Users" total={users?.length} bgcolor="bg-emerald-400" textcolor="text-emerald-400" />
      </div>
      {loading ? (
        <AdminPageSpinner fill="fill-emerald-400" />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-12 gap-x-3 rounded-md pl-3.5 py-2 pr-2 mb-7 text-sm">
              <div className="col-span-2">First Name</div>
              <div className="col-span-2">Last Name</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Date & Time</div>
              <div className="col-span-1"></div>
            </div>
            <div className="flex flex-col gap-y-3">
              {users?.map((user: UserProps) => (
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
