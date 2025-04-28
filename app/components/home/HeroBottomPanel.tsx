'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useCountdown from '@/app/hooks/useCountdown'
import { useDispatch } from 'react-redux'
import { RootState, useAppSelector } from '@/app/redux/store'
import { setOpenModal } from '@/app/redux/features/appSlice'
import EditableTextArea from '../common/EditableTextArea'
import Spinner from '../common/Spinner'

const HeroBottomPanel = () => {
  const { textBlockMap, loading } = useAppSelector((state: RootState) => state.textBlock)
  const [loadingTimer, setLoadingTimer] = useState(true)

  const expirationDate = useMemo(() => {
    const splitDate = textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer?.split('-')

    if (splitDate) {
      const date = new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2]))
      return date
    } else {
      const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())
      date.setMonth(date.getMonth() + 1)
      return date
    }
  }, [textBlockMap?.COUNTDOWN_BLOCK?.countdownTimer])

  const { timerData } = useCountdown(expirationDate)

  useEffect(() => {
    if (timerData) {
      const isTimerReady = timerData.some((timer) => timer.value !== '00')
      if (isTimerReady) {
        setLoadingTimer(false)
      }
    }
  }, [timerData])

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
    <>
      <div className="absolute bottom-0 left-0 z-30 w-full grid grid-cols-12 gap-x-10 h-full max-h-[141px]">
        <div className="col-span-12 990:col-span-6 bg-sunburst py-3 px-3">
          {loadingTimer ? (
            <div className="flex items-center justify-center h-full">
              <Spinner fill="fill-white" track="text-sunburst" wAndH="w-8 h-8" />
            </div>
          ) : (
            <button onClick={handleClick} className="w-full mx-auto flex items-center justify-end gap-x-5">
              {timerData.map((info, i) => (
                <div
                  key={i}
                  className={`${
                    i !== 3 ? 'border-r-[1px] border-r-white/40' : ''
                  } flex flex-col items-center w-[155px]`}
                >
                  <div className="text-[70px] font-bold text-white font-oswald">{info.value}</div>
                  <div className={`text-white/70 font-bold uppercase font-raleway -mt-3`}>{info.textKey}</div>
                </div>
              ))}
            </button>
          )}
        </div>
        <div className="col-span-12 990:col-span-6 bg-blaze py-3 pl-12 pr-3">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner fill="fill-white" track="text-blaze" wAndH="w-8 h-8" />
            </div>
          ) : (
            <EditableTextArea
              tag="h1"
              initialValue={textBlockMap?.COUNTDOWN_BLOCK?.countdownMessage}
              type="COUNTDOWN_BLOCK"
              textBlockKey="countdownMessage"
              className="text-[70px] font-bold uppercase font-oswald text-white"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default HeroBottomPanel
