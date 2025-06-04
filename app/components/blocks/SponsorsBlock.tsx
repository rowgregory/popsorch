'use client'

import React, { FC } from 'react'
import Picture from '../common/Picture'
import { communitySponsors, corporateSponsors } from '@/public/data/home.data'

const SponsorLogoBlock: FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div className="h-20 col-span-6 990:col-span-4 px-7 py-2.5 border-2 border-silver dark:border-charcoalnight bg-white group hover:border-blaze duration-700">
    <Picture
      src={imageUrl}
      className="w-full h-full object-contain group-hover:scale-125 duration-700"
      priority={false}
    />
  </div>
)

const SponsorsBlock = () => {
  return (
    <div className="bg-duskgray px-3 py-36">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative flex flex-col justify-center items-center">
        <h1 className="font-changa text-white text-[56px] mb-2">Partner Supporters</h1>
        <p className="text-lg font-changa text-white w-full max-w-2xl text-center mb-20">
          A big thanks to our sponsors for their generous support in making everything we do possible
        </p>
        <div className="grid grid-cols-12 gap-y-10 576:gap-x-10 w-full">
          <h1 className="col-span-12 990:col-span-4 border-l-3 border-l-blaze pl-5 text-2xl 576:text-3xl text-white h-fit mb-5 990:mb-0 font-changa">
            Corporate Sponsors
          </h1>
          <div className="grid grid-cols-12 col-span-12 990:col-span-8 gap-3 md:gap-6">
            {corporateSponsors.map((sponsor, i) => (
              <SponsorLogoBlock key={i} imageUrl={sponsor.img} />
            ))}
          </div>
        </div>
        <div className="mt-28 grid grid-cols-12 gap-y-10 576:gap-x-10 w-full">
          <h1 className="col-span-12 990:col-span-4 border-l-3 border-l-blaze pl-5 text-3xl text-white h-fit mb-5 990:mb-0 font-changa">
            Community Sponsors
          </h1>
          <div className="grid grid-cols-12 col-span-12 990:col-span-8 gap-3 md:gap-6">
            {communitySponsors.map((sponsor, i) => (
              <SponsorLogoBlock key={i} imageUrl={sponsor.img} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorsBlock
