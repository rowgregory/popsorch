'use client'

import React from 'react'
import Picture from '@/app/components/common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchVenuesQuery } from '@/app/redux/services/venueApi'
import Spinner from '@/app/components/common/Spinner'
import Breadcrumb from '../components/common/Breadcrumb'
import { VenueProps } from '../types/model.types'

const Venues = () => {
  const { isLoading } = useFetchVenuesQuery({})
  const { venues } = useAppSelector((state: RootState) => state.venue)

  return (
    <>
      <Breadcrumb breadcrumb="Venues" />
      <div className="px-4 py-14 md:px-12 990:py-36">
        <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] w-full mx-auto flex flex-col gap-y-9">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner fill="fill-blaze" track="text-inkblack" wAndH="w-10 h-10" />
            </div>
          ) : (
            venues.map((venue: VenueProps) => (
              <div key={venue?.id} className="flex flex-col">
                <Picture
                  src={venue?.imageUrl}
                  className="w-full h-full rounded-tl-md rounded-tr-md object-cover max-h-[630px]"
                  priority={true}
                />
                <div className={`bg-duskgray px-9 pt-9 pb-14 rounded-br-md rounded-bl-md`}>
                  <p className="text-blaze uppercase font-lato text-center text-12">{venue?.capacity} seats</p>
                  <div className="uppercase font-changa text-2xl text-center mb-6">{venue?.name}</div>
                  <ul className="text-[#b2b2b2] text-center space-y-3 font-lato">
                    <li>{venue?.accessibility}</li>
                    <li>{venue?.immersiveEnvironment}</li>
                    <li>{venue?.parking}</li>
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Venues
