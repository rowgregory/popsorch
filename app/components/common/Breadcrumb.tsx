import { FC } from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
  breadcrumb: string
  classname?: string
  secondCrumb?: string
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb, classname, secondCrumb }) => {
  return (
    <div className="px-4 990:px-12 xl:px-4 py-1 1200:py-6 bg-white">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto">
        <div
          className={` mx-auto w-full flex flex-col 1200:flex-row items-center justify-between ${
            classname ?? '1200:max-w-screen-1400'
          }`}
        >
          <h1 className="text-blaze font-changa text-[32px]">{breadcrumb}</h1>
          <div className="h-9 1200:h-12 flex items-center justify-center text-uppercase font-changa gap-x-3 text-13 font-medium tracking-widest">
            <Link href="/" className="text-blaze">
              Home
            </Link>
            <span className="text-[#858585]">/</span>
            {secondCrumb && (
              <>
                <Link href={`/${secondCrumb.toLowerCase()}`} className="text-blaze">
                  {secondCrumb}
                </Link>
                <h1 className="text-[#858585]">/</h1>
              </>
            )}
            <h1 className="text-[#858585]">{breadcrumb}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
