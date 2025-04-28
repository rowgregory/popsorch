'use client'

import React, { useMemo } from 'react'
import useCountdown from '@/app/hooks/useCountdown'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import UnderlineSVG from '../svg/UnderlineSVG'
import { useDispatch } from 'react-redux'
import { RootState, useAppSelector } from '@/app/redux/store'
import { setOpenModal } from '@/app/redux/features/appSlice'
import EditableTextArea from '../common/EditableTextArea'

const CountdownBlockDeprecated = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const expirationDate = useMemo(() => {
    const splitDate = textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer?.split('-')

    if (splitDate) {
      const date = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]))
      date.setMonth(date.getMonth() + 1)
      return date
    } else {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())
      date.setMonth(date.getMonth() + 1)
      return date
    }
  }, [textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer])

  const { timerData } = useCountdown(expirationDate)

  const { ref, visible } = useAnimatedSectionTitle(0.2)

  const dispatch = useDispatch()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const { openModal } = useAppSelector((state: RootState) => state.app)

  const handleClick = () => {
    if (isAuthenticated) {
      dispatch(
        setOpenModal({
          show: openModal,
          initialValue: textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer,
          type: 'COUNTDOWN_BLOCK',
          textBlockKey: 'countdownTimer'
        })
      )
    }
  }

  return (
    <section className="px-4 py-10 md:px-12 md:py-24">
      <div
        onClick={handleClick}
        ref={ref}
        className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12"
      >
        {timerData.map((info, i) => (
          <div key={i} className="col-span-6 990:col-span-3 flex items-center relative">
            <div className="text-[50px] 430:text-[60px] md:text-[90px] 1400:text-[130px] font-semibold text-blaze">
              {info.value}
            </div>
            <div
              className={`text-[20px] 430:text-[26px] md:text-[32px] 1400:text-[42px] text-white -ml-4 md:-ml-8 font-extrabold transition-opacity duration-700 bg-transparent ${
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
        <EditableTextArea
          tag="h1"
          initialValue={textBlockMap?.COUNTDOWN_BLOCK?.countdownMessage}
          type="COUNTDOWN_BLOCK"
          textBlockKey="countdownMessage"
          className="text-2xl font-bold uppercase text-center text-gunmetal dark:text-white"
        />
        <UnderlineSVG />
      </div>
    </section>
  )
}

export default CountdownBlockDeprecated
