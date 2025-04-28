import React, { FC } from 'react'
import Spinner from '../common/Spinner'

interface AdminFormBtns {
  close: any
  loading: boolean
  isUpdating: boolean
  btnColor?: string
  spinnerTrack?: string
}

const AdminFormBtns: FC<AdminFormBtns> = ({ close, loading, isUpdating, btnColor, spinnerTrack }) => {
  return (
    <>
      <button
        type="button"
        onClick={close}
        className="order-2 576:order-2 w-full 576:w-36 py-3.5 text-sm font-medium font-changa uppercase rounded-sm bg-gray-300 text-charcoalgray duration-300"
      >
        Close
      </button>
      <button
        type="submit"
        className={`${btnColor} order-1 576:order-2  w-full 576:w-36 py-3.5 text-sm font-medium font-changa uppercase rounded-sm duration-300`}
      >
        {loading ? (
          <Spinner fill="fill-white" track={`${spinnerTrack ?? 'text-blaze'}`} wAndH="w-4 h-4" />
        ) : isUpdating ? (
          'Update'
        ) : (
          'Create'
        )}
      </button>
    </>
  )
}

export default AdminFormBtns
