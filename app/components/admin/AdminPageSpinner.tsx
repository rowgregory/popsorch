import React, { FC } from 'react'
import Spinner from '../common/Spinner'

interface AdminPageSpinnerProps {
  fill: string
}

const AdminPageSpinner: FC<AdminPageSpinnerProps> = ({ fill }) => {
  return (
    <div className="w-full flex items-center justify-center pt-10">
      <Spinner wAndH="w-10 h-10" fill={fill} track="text-duskgray" />
    </div>
  )
}

export default AdminPageSpinner
