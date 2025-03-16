import React, { FC } from 'react'
import Link from 'next/link'
import AwesomeIcon from './AwesomeIcon'
import { chevronRightIcon } from '@/app/lib/icons'

interface BreadcrumbProps {
  breadcrumb: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb }) => {
  return (
    <div className="flex items-center gap-2 text-sm roboto-regular text-white px-4 py-2">
      <Link href="/">Home</Link>
      <AwesomeIcon icon={chevronRightIcon} className="w-3 h-3" />
      <span>{breadcrumb}</span>
    </div>
  )
}

export default Breadcrumb
