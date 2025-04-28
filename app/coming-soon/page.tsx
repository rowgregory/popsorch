'use client'

import React, { useMemo } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import useCountdown from '../hooks/useCountdown'
import { RootState, useAppSelector } from '../redux/store'

const getExpirationDate = (dateString: string | undefined) => {
  const splitDate = dateString?.split('-')

  if (splitDate) {
    const date = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]))
    date.setMonth(date.getMonth())
    return date
  }

  const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())
  date.setMonth(date.getMonth() + 1)
  return date
}

const CountdownSection = ({
  title,
  subtitle,
  expirationDate
}: {
  title: string
  subtitle: string
  expirationDate: Date
}) => {
  const { timerData } = useCountdown(expirationDate)

  return (
    <section className="px-4">
      <h1 className="font-changa text-5xl text-center">{title}</h1>
      <h1 className="font-lato text-[#b2b2b2] text-center my-7">{subtitle}</h1>
      <div className="flex items-center justify-center">
        {timerData.map((info, i, arr) => (
          <div
            key={i}
            className={`${
              i !== arr.length - 1 ? 'border-r-1 border-white/80' : ''
            } flex flex-col items-center justify-center py-6 px-8`}
          >
            <div className="text-[50px] 430:text-[60px] 760:text-[90px] font-lato font-semibold text-blaze -mt-10">
              {info.value}
            </div>
            <div className="uppercase text-12 font-lato font-bold -mt-5">{info.textKey}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const ComingSoon = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const expirationDate = useMemo(
    () => getExpirationDate(textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer),
    [textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer]
  )
  const expirationDate2 = useMemo(() => getExpirationDate('2025-06-16'), [])
  const expirationDate3 = useMemo(() => getExpirationDate('2025-08-01'), [])

  return (
    <>
      <Breadcrumb breadcrumb="Coming Soon" />
      <div className="px-4 py-14 760:px-12 990:py-36">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] w-full mx-auto relative flex flex-col justify-center items-center gap-y-40">
          <CountdownSection
            title="Season Subscription Renewals"
            subtitle="May 1 - Stay Tuned!"
            expirationDate={expirationDate}
          />
          <CountdownSection
            title="New Season Subscriptions Available"
            subtitle="June 15 - Stay Tuned!"
            expirationDate={expirationDate2}
          />
          <CountdownSection
            title="Single Concert Tickets Available"
            subtitle="August 1 - Stay Tuned!"
            expirationDate={expirationDate3}
          />
        </div>
      </div>
    </>
  )
}

export default ComingSoon
