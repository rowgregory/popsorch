import { openUpdateDrawer } from '@/app/redux/features/dashboardSlice'
import { createFormActions } from '@/app/redux/features/formSlice'
import { resetUser, UserProps } from '@/app/redux/features/userSlice'
import { useDeleteUserMutation } from '@/app/redux/services/userApi'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { formatDate } from '@/app/utils/date.functions'
import React, { FC, useState } from 'react'
import AdminTrashDeleteBtn from './AdminTrashDeleteBtn'

const AdminUserRow: FC<{ user: UserProps }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { setInputs } = createFormActions('user', dispatch)
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteUser] = useDeleteUserMutation()
  const {
    user: { id }
  } = useAppSelector((state: RootState) => state.user)

  const handleUserDelete = async (e: any, userId: string) => {
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [userId]: true }))

    try {
      await deleteUser({ id: userId }).unwrap()

      dispatch(resetUser())
    } catch {
    } finally {
      setLoading((prev) => ({ ...prev, [userId]: false }))
    }
  }
  return (
    <div
      onClick={() => {
        dispatch(openUpdateDrawer())
        setInputs(user)
      }}
      className="grid grid-cols-12 h-14 gap-x-3 bg-midnightblack hover:bg-inkblack rounded-[5px] pl-4 py-2 pr-2 border-l-4 border-l-emerald-400 items-center"
    >
      <div className="col-span-2 truncate">{user?.firstName}</div>
      <div className="col-span-2 truncate">{user?.lastName}</div>
      <div className="col-span-3 truncate">{user?.email}</div>
      <div className="col-span-2 truncate">{user?.role}</div>
      <div className="col-span-2 truncate">{formatDate(user?.createdAt)}</div>
      <div className="col-span-1 truncate">
        {user?.email !== 'sqysh@sqysh.io' && id !== user?.id && (
          <AdminTrashDeleteBtn loading={loading} id={user?.id} handleDelete={handleUserDelete} />
        )}
      </div>
    </div>
  )
}

export default AdminUserRow
