import React, { FC } from 'react'
import Spinner from '../common/Spinner'
import AwesomeIcon from '../common/AwesomeIcon'
import { trashIcon } from '@/app/lib/icons'

interface AdminTrashDeleteBtn {
  loading: any
  id: string
  handleDelete: any
}

const AdminTrashDeleteBtn: FC<AdminTrashDeleteBtn> = ({ loading, id, handleDelete }) => {
  return (
    <>
      {loading[id] ? (
        <Spinner fill="fill-blaze" track="text-midnightblack" wAndH="w-4 h-4" />
      ) : (
        <div
          onClick={(e) => handleDelete(e, id)}
          className="w-8 h-8 rounded-full duration-150 hover:bg-midnightblack flex items-center justify-center cursor-pointer"
        >
          <AwesomeIcon icon={trashIcon} className="w-4 h-4 text-blaze" />
        </div>
      )}
    </>
  )
}

export default AdminTrashDeleteBtn
