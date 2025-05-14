import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import TitleWithLine from '../common/TitleWithLine'
import HomeConcertCard from './HomeConcertCard'
import Link from 'next/link'
import AwesomeIcon from '../common/AwesomeIcon'
import { chevronRightIcon } from '@/app/lib/icons'
import { ConcertProps } from '@/app/redux/features/concertSlice'

const ViewAllConcertsLink = () => (
  <Link
    href="/concerts"
    className="font-lato duration-300 mt-5 hover:text-blaze text-15 flex items-center gap-x-2 group"
  >
    <span>View All Concerts</span>{' '}
    <AwesomeIcon
      icon={chevronRightIcon}
      className="w-3 h-3 -mb-0.5 group-hover:translate-x-1 duration-300 group-hover:rotate-[360deg]"
    />
  </Link>
)

const HomeConcertDates = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 py-40">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center">
        {!loading && (
          <>
            <TitleWithLine
              title={textBlockMap?.HOME_CONCERT_DATES_BLOCK?.homeConcertDatesBlockTitle}
              type="HOME_CONCERT_DATES_BLOCK"
              textBlockKey="homeConcertDatesBlockTitle"
            />
            <ViewAllConcertsLink />
            <div className="relative w-full mt-20 mb-40 h-full">
              <div className="grid grid-cols-12 gap-y-8 transition-transform duration-300 ease-in-out">
                {concerts?.map((concert: ConcertProps, i) => (
                  <HomeConcertCard concert={concert} key={concert.id} index={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomeConcertDates
