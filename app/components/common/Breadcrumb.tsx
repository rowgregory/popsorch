import { FC } from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
  breadcrumb: string
  classname?: string
  secondCrumb?: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb, classname, secondCrumb }) => {
  return (
    <div className="px-4 sm:px-6 py-3 bg-white">
      <div
        className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4 min-w-0 ${classname ?? ''}`}
      >
        <h1 className="text-blaze font-changa text-xl sm:text-2xl truncate">{breadcrumb}</h1>
        <div className="flex items-center gap-x-2 font-changa text-xs sm:text-13 font-medium tracking-widest flex-wrap">
          <Link href="/" className="text-blaze whitespace-nowrap">
            Home
          </Link>
          <span className="text-[#858585]">/</span>
          {secondCrumb && (
            <>
              <Link href={`/${secondCrumb.toLowerCase()}`} className="text-blaze whitespace-nowrap">
                {secondCrumb}
              </Link>
              <span className="text-[#858585]">/</span>
            </>
          )}
          <span className="text-[#858585] whitespace-nowrap">{breadcrumb}</span>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
