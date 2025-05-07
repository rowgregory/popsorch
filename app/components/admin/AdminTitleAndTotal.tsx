import React, { FC } from 'react'
import PageTitle from './PageTitle'
import Spinner from '../common/Spinner'

interface AdminTitleAndTotalProps {
  title: string
  total: number
  bgcolor: string
  textcolor: string
  loading?: boolean
  fillcolor?: string
}

const AdminTitleAndTotal: FC<AdminTitleAndTotalProps> = ({ title, total, bgcolor, textcolor, loading, fillcolor }) => {
  return (
    <div className="flex items-center gap-x-3">
      <PageTitle title={title} color={bgcolor} />
      {loading ? (
        <Spinner fill={`${fillcolor}`} track="text-inkblack" />
      ) : (
        total !== undefined && <h1 className={`${textcolor} font-lato font-semibold text-2xl`}>({total})</h1>
      )}
    </div>
  )
}

export default AdminTitleAndTotal
