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

        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex items-center gap-x-2 font-changa text-xs sm:text-13 font-medium tracking-widest flex-wrap"
          >
            <li>
              <Link
                href="/"
                className="text-blaze whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <span className="text-[#858585]">/</span>
            </li>

            {secondCrumb && (
              <>
                <li>
                  <Link
                    href={`/${secondCrumb.toLowerCase()}`}
                    className="text-blaze whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
                  >
                    {secondCrumb}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <span className="text-[#858585]">/</span>
                </li>
              </>
            )}

            <li>
              <span className="text-[#858585] whitespace-nowrap" aria-current="page">
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumb
