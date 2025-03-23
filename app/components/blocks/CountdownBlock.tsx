'use client'

import React, { useMemo } from 'react'
import useCountdown from '@/app/hooks/useCountdown'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import UnderlineSVG from '../svg/UnderlineSVG'

const CountdownBlock = () => {
  const expirationDate = useMemo(() => {
    const date = new Date(2025, 4, 1)
    date.setMonth(date.getMonth() + 1)
    return date
  }, [])

  const { timerData } = useCountdown(expirationDate)

  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <section className="px-4 py-10 md:px-12 md:py-24">
      <div
        ref={ref}
        className="max-w-[516px] md:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12"
      >
        {timerData.map((info, i) => (
          <div key={i} className="col-span-6 990:col-span-3 flex items-center relative">
            <div className="text-[50px] 430:text-[60px] md:text-[90px] 1400:text-[130px] font-semibold text-blaze">{info.value}</div>
            <div
              className={`text-[20px] 430:text-[26px] md:text-[32px] 1400:text-[42px] text-white -ml-4 md:-ml-8 font-extrabold transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                WebkitTextStroke: '2px',
                WebkitTextFillColor: '#0b1120'
              }}
            >
              {info.textKey}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold uppercase text-center text-gunmetal dark:text-white">Season renewals go on sale May 1</h1>
        <UnderlineSVG />
      </div>
    </section>
  )
}

export default CountdownBlock
