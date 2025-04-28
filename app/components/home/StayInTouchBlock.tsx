import Link from 'next/link'
import React from 'react'
import { plusIcon } from '@/app/lib/icons'
import SquareElement from '../common/SquareElement'

const StayInTouchBlock = () => {
  return (
    <div className="px-3 py-36 bg-[#f8f8f8]">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative flex flex-col justify-center items-center">
        <h1 className="font-oswald text-[56px] mb-5">Don&apos;t miss what&apos;s coming next</h1>
        <p className="text-lg font-raleway w-full max-w-2xl text-center">
          Sign up for updates and be the first to hear about new shows, guest artists, and special announcements.
        </p>
        <Link
          href="/newsletter"
          className="flex items-center justify-center mt-4 mb-10 border-[8px] border-blaze/50 group hover:bg-blaze duration-300"
        >
          <div className="text-lg font-oswald uppercase flex font-semibold px-8 text-blaze group-hover:text-white">
            Join our Mailing List
          </div>
          <SquareElement color="bg-blaze" className="w-14 h-14" iconSize="w-9 h-9" fa={plusIcon} />
        </Link>
      </div>
    </div>
  )
}

export default StayInTouchBlock
