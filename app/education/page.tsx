'use client'

import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import Picture from '../components/common/Picture'
import TitleWithLine from '../components/common/TitleWithLine'

const Education = () => {
  return (
    <>
      <Breadcrumb breadcrumb="Education" />
      <div className="px-4 py-40 relative">
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('/images/bio-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div
          className={`max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full grid grid-cols-12 gap-y-12 990:gap-x-20 items-center relative z-10`}
        >
          <div className="col-span-12 1200:col-span-6 flex flex-col items-center 1200:items-start">
            <TitleWithLine title="Performing in the Pops Orchestra" />
            <p className="font-lato text-[#cacaca] mb-5 text-center 1200:text-left mt-12">
              For 48 years the Pops Orchestra has been performing for the greater Sarasota and Bradenton communities but
              you may not be aware of the Orchestra&apos;s support of young musicians. Each season, several promising
              young musicians perform as members of the orchestra and gain valuable experience and mentoring from
              section leaders and its conductor.
            </p>
          </div>
          <div className="mt-20 1200:mt-0 col-span-12 1200:col-span-6 flex justify-center">
            <div className="relative before:absolute before:content-[''] before:w-full before:h-full before:border-4 before:border-blaze before:rounded-md before:z-[-1] before:-top-2 430:before:-top-10 left-0 before:max-w-[450px] max-w-[450px] h-full max-h-[700px]">
              <Picture
                src="/images/edu-1.jpg"
                className="w-full h-fit object-contain ml-0 430:ml-12"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Education
