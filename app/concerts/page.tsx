'use client'

import React, { ChangeEvent, useMemo, useState } from 'react'
import { RootState, useAppSelector } from '../redux/store'
import PublicConcertRow from '../components/public/PublicConcertRow'
import Breadcrumb from '../components/common/Breadcrumb'
import CampInput from '../forms/elements/CampInput'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { magnifyingGlassIcon } from '../lib/icons'
import Spinner from '../components/common/Spinner'
import { ConcertProps } from '../redux/features/concertSlice'

const Concerts = () => {
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { loading } = useAppSelector((state: RootState) => state.app)
  const [filterText, setFilterText] = useState('')

  const filteredConcerts = useMemo(() => {
    const lowerText = filterText.toLowerCase()
    return concerts.filter((concert: ConcertProps) => concert.name.toLowerCase().includes(lowerText))
  }, [filterText, concerts])

  return (
    <>
      <Breadcrumb breadcrumb="Concerts" />
      <section className="px-4 990:px-12 xl:px-4">
        <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 w-full mx-auto grid grid-cols-12 990:gap-x-12 pt-32 pb-44">
          <div className="order-2 1200:order-1 col-span-12 1200:col-span-8 flex flex-col items-center gap-y-24">
            {loading ? (
              <Spinner fill="fill-blaze" track="text-inkblack" wAndH="w-10 h-10" />
            ) : (
              <>
                {filteredConcerts?.length === 0 ? (
                  <div className="font-changa text-sm uppercase text-left font-medium tracking-wider">No results</div>
                ) : (
                  filteredConcerts?.map((concert: ConcertProps) => (
                    <PublicConcertRow key={concert.id} concert={concert} />
                  ))
                )}
              </>
            )}
          </div>
          <form className="order-1 1200:order-2 col-span-12 1200:col-span-4 mb-12 1200:mb-0 flex flex-col gap-y-4 gap-x-2 w-full bg-duskgray p-9 h-fit">
            <label htmlFor="name" className="text-white font-changa text-2xl">
              Search
            </label>
            <div className="relative w-full">
              <CampInput
                name="name"
                value={filterText}
                handleInput={(e: ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                placeholder="Search"
              />
              <AwesomeIcon
                icon={magnifyingGlassIcon}
                className="text-blaze w-3 h-3 absolute top-1/2 -translate-y-1/2 right-3"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Concerts
