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
              <div key={venue?.id} className="flex flex-col rounded-md overflow-hidden shadow-md bg-inkblack">
                <Picture src={venue?.imageUrl} className="w-full h-full object-cover max-h-[630px]" priority={true} />
                <div className="bg-duskgray px-8 pt-8 pb-12">
                  <p className="text-blaze uppercase font-lato text-center text-[12px] tracking-widest mb-2">
                    {venue?.capacity} seats
                  </p>
                  <h3 className="uppercase font-changa text-2xl text-center text-white mb-8">{venue?.name}</h3>
                  <div className="grid grid-cols-2 gap-y-4 border-t border-zinc-700/70 pt-6 text-[#b2b2b2] font-lato text-sm">
                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Accessibility</div>
                    <div className="pl-4">{venue?.accessibility}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Immersive Environment</div>
                    <div className="pl-4">{venue?.immersiveEnvironment}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Parking</div>
                    <div className="pl-4">{venue?.parking}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Address</div>
                    <div className="pl-4">{venue?.address}</div>
                  </div>
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
