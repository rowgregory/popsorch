import React from 'react'
import TitleWithLine from '../common/TitleWithLine'
import Link from 'next/link'

const HomeSignUp = () => {
  return (
    <div className="px-4 py-40 relative">
      <div
        className={`max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-screen-1400 mx-auto w-full flex flex-col items-center justify-center relative z-10`}
      >
        <TitleWithLine title="Keep Up To Date" />
        <p className="text-white/80 font-lato mt-7 mb-9 w-full text-center">
          Keep up to date on Pops concerts, news announcements, and special offers.
        </p>
        <Link
          href="/newsletter"
          className="bg-blaze font-changa text-12 text-white px-8 py-4 uppercase font-medium tracking-widest rounded-md hover:bg-blazehover duration-300"
        >
          Sign Me Up
        </Link>
      </div>
    </div>
  )
}

export default HomeSignUp
