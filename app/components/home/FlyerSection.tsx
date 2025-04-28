import React from 'react'
import EditableImage from '../common/EditableImage'
import Link from 'next/link'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowRightIcon } from '@/app/lib/icons'

const FlyerSection = () => {
  return (
    <div className="w-full bg-charcoalblue px-3 py-40">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto flex flex-col items-center justify-center">
        <div className="relative border-1 border-white/50 py-9 px-20 after:absolute after:inset-[-10px] after:border after:border-white/50 after:content-['']">
          <EditableImage
            src="/images/anniversary.png"
            type="FLYER"
            textBlockKey="flyerImage"
            className="max-w-screen-sm w-full h-auto object-contain"
            priority={true}
          />
        </div>
        <Link
          href="/concerts"
          className="text-2xl font-oswald text-white bg-[#41494b] hover:bg-blaze duration-300 gap-x-2.5 flex items-center mt-10 px-7 py-2.5 uppercase w-fit"
        >
          <AwesomeIcon icon={arrowRightIcon} className="text-white w-4 h-4" />
          See Concerts
        </Link>
      </div>
    </div>
  )
}

export default FlyerSection
