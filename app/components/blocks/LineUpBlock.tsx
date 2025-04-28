import { useFetchConcertsQuery } from '@/app/redux/services/concertApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import React from 'react'
import ImageCarousel from '../common/ImageCarousel'

const LineUpBlock = () => {
  useFetchConcertsQuery({})
  const { concerts } = useAppSelector((state: RootState) => state.concert)

  return (
    <>
      <div className="px-3 w-full mx-auto flex flex-col items-center justify-center bg-white py-32">
        <h1 className="font-bold font-oswald text-[56px] uppercase flex items-baseline gap-x-3">
          LineUp<span className="text-[56px] text-blaze font-raleway">{new Date().getFullYear()}</span>
        </h1>
        <p className="text-lg font-raleway py-10 text-center text-[#565656] leading-relaxed">
          Discover The Pops Orchestra&apos;s unique offerings and unforgettable experiences.
        </p>
        <ImageCarousel items={concerts} changeColor />
      </div>
    </>
  )
}

export default LineUpBlock
