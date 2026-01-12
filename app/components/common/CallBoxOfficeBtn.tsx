import Link from 'next/link'
import { FC } from 'react'

const CallBoxOfficeBtn: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      href="tel:19419267677"
      className={`relative z-10 px-6 py-3 rounded-xl bg-gradient-to-r from-sunburst to-blaze hover:from-sunburst hover:to-blaze text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-blaze/30 w-full flex-1 text-center`}
    >
      Call Box Office
    </Link>
  )
}

export default CallBoxOfficeBtn
