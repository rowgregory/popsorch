import Link from 'next/link'
import React, { FC } from 'react'

const CallBoxOfficeBtn: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      href="tel:19419267677"
      className={`${
        className ?? 'py-4 w-fit px-8'
      } bg-blaze font-changa uppercase whitespace-nowrap rounded-sm text-[12px] font-bold tracking-widest hover:bg-blazehover duration-300`}
    >
      Call Box Office
    </Link>
  )
}

export default CallBoxOfficeBtn
