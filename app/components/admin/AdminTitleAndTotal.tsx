import React, { FC } from 'react'
import PageTitle from './PageTitle'

interface AdminTitleAndTotalProps {
  title: string
  total: number
  bgcolor: string
  textcolor: string
}

const AdminTitleAndTotal: FC<AdminTitleAndTotalProps> = ({ title, total, bgcolor, textcolor }) => {
  return (
    <div className="flex items-center gap-x-3">
      <PageTitle title={title} color={bgcolor} />
      <h1 className={`${textcolor} font-lato font-semibold text-2xl`}>({total})</h1>
    </div>
  )
}

export default AdminTitleAndTotal
