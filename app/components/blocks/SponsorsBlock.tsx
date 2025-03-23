'use client'

import React from 'react'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import Picture from '../common/Picture'

const corporateSponsors = [
  { img: '/images/charles-schwab-logo.avif' },
  { img: '/images/rbc.png' },
  { img: '/images/gh-2.png' },
  { img: '/images/mt.jpg' },
  { img: '/images/armel.png' },
  { img: '/images/luhrsen.png' },
  { img: '/images/adobe.png' }
]
const communitySponsors = [
  { img: '/images/csp-1.png' },
  { img: '/images/csp-2.jpg' },
  { img: '/images/csp-3.png' },
  { img: '/images/csp-4.png' },
  { img: '/images/csp-5.png' },
  { img: '/images/csp-6.jpg' },
  { img: '/images/csp-7.jpg' },
  { img: '/images/csp-8.png' },
  { img: '/images/csp-9.png' },
  { img: '/images/csp-10.png' },
  { img: '/images/csp-11.webp' },
  { img: '/images/csp-12.png' }
]

const SponsorsBlock = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <div className="dark:bg-shadowblue px-4 py-14 md:px-12 md:py-24">
      <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 576:gap-x-10">
        <div className="col-span-12">
          <AnimatedSectionHeader title="Our Sponsors" />
          <div
            ref={ref}
            className={`transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[47px] 430:text-[60px] font-bold mt-1 text-irongray dark:text-white`}
          >
            Partner
          </div>
          <div className="flex flex-col 990:flex-row 990:items-start 990:justify-between w-full">
            <h3 className="text-[47px] 430:text-[60px] font-bold text-blaze -mt-8">Supporters</h3>
            <p className="text-lg text-slategray dark:text-slatemist font-semibold 990:-mt-2 leading-snug max-w-lg text-left 990:text-right">
              A big thanks to our sponsors for their generous support in making everything we do possible
            </p>
          </div>
          <div className="mt-20 grid grid-cols-12 gap-y-10 576:gap-x-10">
            <h1 className="col-span-12 990:col-span-4 border-l-3 border-l-blaze pl-5 text-2xl 576:text-3xl text-gunmetal dark:text-zinc-200 font-bold h-fit mb-5 990:mb-0">
              Corporate Sponsors
            </h1>
            <div className="grid grid-cols-12 col-span-12 990:col-span-8 gap-3 md:gap-6">
              {corporateSponsors.map((sponsor, i) => (
                <div
                  key={i}
                  className="h-20 col-span-6 990:col-span-4 px-7 py-2.5 border-2 border-silver dark:border-charcoalnight rounded-xl bg-white group"
                >
                  <Picture src={sponsor.img} className="w-full h-full object-contain group-hover:scale-125 duration-700" priority={false} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-28 grid grid-cols-12 gap-y-10 576:gap-x-10">
            <h1 className="col-span-12 990:col-span-4 border-l-3 border-l-blaze pl-5 text-3xl text-gunmetal dark:text-zinc-200 font-bold h-fit mb-5 990:mb-0">
              Community Sponsors
            </h1>
            <div className="grid grid-cols-12 col-span-12 990:col-span-8 gap-3 md:gap-6">
              {communitySponsors.map((sponsor, i) => (
                <div
                  key={i}
                  className="h-20 col-span-6 990:col-span-4 px-7 py-2.5 border-2 border-silber dark:border-charcoalnight rounded-xl relative overflow-hidden bg-white group"
                >
                  <Picture
                    src={sponsor.img}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-125 duration-700"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorsBlock
