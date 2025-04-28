import Link from 'next/link'
import React from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { chevronDownIcon } from '@/app/lib/icons'

const HomeAboutSection = () => {
  return (
    <div className="px-3 py-32 bg-white">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto flex flex-col items-center justify-center">
        <h1 className="font-bold font-oswald text-[56px] uppercase mb-5">The Heartbeat of Sarasota&apos;s Sound</h1>
        <p className="text-lg font-raleway py-10 border-t-1 border-t-gray-200 text-center text-[#565656] leading-relaxed">
          As one of the top performing arts groups in a unique, culturally rich community, The Pops Orchestra attracts
          full-time residents, Suncoast “Snowbirds,” and vacationers to its concerts, proving to be a cultural and
          economic asset to the Greater Sarasota community. Led by conductor <Link href="/robyn-bell">Robyn Bell</Link>,
          The Pops presents high quality musical entertainment at affordable prices.
        </p>
        <p className="text-lg font-raleway pb-10 text-center text-[#565656] leading-relaxed">
          Our annual series of acclaimed Pops concerts are performed at Riverview Performing Arts Center in Sarasota and
          SCF Neel Performing Arts Center in Bradenton.
        </p>
        <p className="text-lg font-raleway pb-10 text-center text-[#565656] leading-relaxed border-b-1 border-b-gray-200 mb-10">
          Our mission extends naturally to unique educational offerings for music students in our community.
        </p>
        <div className="font-oswald text-[22px] mb-8">Check it Out</div>
        <Link href="/" className="relative w-10 h-10 flex items-center justify-center">
          {/* Bottom rotated berryPunch square */}
          <div className="absolute inset-0 bg-[#ffcb94] rotate-45 -m-2 z-0"></div>

          {/* Top rotated sunburst square */}
          <div className="absolute inset-0 bg-sunburst rotate-45 z-10"></div>
          <AwesomeIcon icon={chevronDownIcon} className="text-white w-5 h-5 absolute z-20" />
        </Link>
      </div>
    </div>
  )
}

export default HomeAboutSection
