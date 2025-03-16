'use client'

import React from 'react'
import Hero from '../components/common/Hero'
import AnimatedSectionHeader from '../components/common/AnimatedSectionHeader'
import useAnimatedSectionTitle from '../hooks/useAnimatedSectionTitle'
import { useFetchLunchesQuery } from '../redux/services/lunchApi'

const LunchProgram = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)
  const { data } = useFetchLunchesQuery(null)
  console.log('data: ', data)

  return (
    <>
      <Hero src="/images/lunch-bg.png" title="Lunch Program" />
      <div className="px-4 py-14 md:px-12 md:py-24">
        <div className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 md:gap-x-10 items-end">
          <div className="col-span-12 990:col-span-6">
            <AnimatedSectionHeader title="Luncheon" />
            <div
              ref={ref}
              className={`transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0'
              } text-[47px] 430:text-[60px] text-irongray dark:text-white font-bold mt-1`}
            >
              Lunch With
            </div>
            <div className="flex flex-col 990:flex-row 990:items-start 990:justify-between w-full">
              <h3 className="text-[47px] 430:text-[60px] font-bold text-blaze -mt-8">Robyn</h3>
            </div>
          </div>
          <div className="col-span-12 990:col-span-6">
            <p className="text-lg font-semibold text-slategray dark:text-slatemist max-w-2xl text-left 990:text-right">
              Join us for an exclusive lunch with the conductor of The Pops, where you&apos;ll get a behind-the-scenes look at the
              orchestra&apos;s magic. It&apos;s a unique opportunity to connect with the heart of the music and enjoy an unforgettable
              experience.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LunchProgram
