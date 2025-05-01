import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import TitleWithLine from '../common/TitleWithLine'
import ConcertCard from './HomeConcertCard'
import Link from 'next/link'
import AwesomeIcon from '../common/AwesomeIcon'
import { chevronRightIcon } from '@/app/lib/icons'
import { ConcertProps } from '@/app/redux/features/concertSlice'
import Spinner from '../common/Spinner'

const ViewAllConcertsLink = () => (
  <Link
    href="/concerts"
    className="font-lato duration-300 mt-5 hover:text-blaze text-15 flex items-center gap-x-2 group"
  >
    <span>View All Concerts</span>{' '}
    <AwesomeIcon icon={chevronRightIcon} className="w-3 h-3 -mb-0.5 group-hover:translate-x-1 duration-300" />
  </Link>
)

const HomeConcertDates = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { loading } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="px-4 py-32">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center">
        <TitleWithLine title="Upcoming Season Concerts" />
        {loading ? (
          <span className="mt-10">
            <Spinner wAndH="w-10 h-10" fill="fill-blaze" track="text-inkblack" />
          </span>
        ) : (
          <>
            <ViewAllConcertsLink />
            <div className="relative w-full mt-20 mb-40 h-full">
              <div className="grid grid-cols-12 gap-4 transition-transform duration-300 ease-in-out">
                {concerts
                  .filter((concert: any) => concert.type === 'Season')
                  .map((concert: ConcertProps, i) => (
                    <ConcertCard concert={concert} key={concert.id} index={i} />
                  ))}
              </div>
            </div>
            <TitleWithLine title="Upcoming Add On Concerts" />
            <ViewAllConcertsLink />
            <div className="relative w-full mt-20 h-full">
              <div className="grid grid-cols-12 gap-4 transition-transform duration-300 ease-in-out">
                {concerts
                  .filter((concert: any) => concert.type === 'Add-On')
                  .slice(0, 3)
                  .map((concert: ConcertProps, i) => (
                    <ConcertCard concert={concert} key={concert.id} index={i} />
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
