'use client'

import React, { useState } from 'react'
import Picture from '@/app/components/common/Picture'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useFetchVenuesQuery } from '@/app/redux/services/venueApi'
import Spinner from '@/app/components/common/Spinner'
import Breadcrumb from '../components/common/Breadcrumb'
import { VenueProps } from '../types/model.types'
import RiverviewPACFirstFloorSVG from '../components/svg/RiverviewPACFirstFloorSVG'
import SCFNeelPACSVG from '../components/svg/SCFNeelPACSVG'
import SCFNeel2ndHalf from '../components/svg/SCFNeel2ndHalf'
import RiverviewBalconySVG from '../components/svg/RiverviewBalconySVG'
import OrchMapLight from '../components/OrchMapLight'

interface SVGProps {
  visible: boolean
  seat: string | null
  price: string | null
  level: string | null
}

const SVGinitialState = {
  visible: false,
  seat: '',
  price: '',
  level: ''
}

const Venues = () => {
  const { isLoading } = useFetchVenuesQuery({})
  const { venues } = useAppSelector((state: RootState) => state.venue)
  const [neel, setNeel] = useState<SVGProps>(SVGinitialState)
  const [neel2, setNeel2] = useState<SVGProps>(SVGinitialState)
  const [riverview, setRiverview] = useState<SVGProps>(SVGinitialState)
  const [riverview2, setRiverview2] = useState<SVGProps>(SVGinitialState)

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
                  <div className="grid grid-cols-2 gap-y-4 border-y border-zinc-700/70 py-6 text-white font-lato text-sm">
                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Accessibility</div>
                    <div className="pl-4">{venue?.accessibility}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Immersive Environment</div>
                    <div className="pl-4">{venue?.immersiveEnvironment}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Parking</div>
                    <div className="pl-4">{venue?.parking}</div>

                    <div className="font-semibold text-right pr-4 border-r border-[#555]">Address</div>
                    <div className="pl-4">{venue?.address}</div>
                  </div>
                  <div className="relative h-[400px] my-6">
                    <OrchMapLight
                      latitude={Number(venue.latitude)}
                      longitude={Number(venue.longitude)}
                      address={venue?.address}
                    />
                  </div>
                  <div className="border-b border-b-zinc-700/70 w-full h-[1px] my-6" />
                  <div className="overflow-hidden w-full overflow-x-auto mb-8">
                    <div className="min-w-[800px] w-full overflow-x-auto">
                      {venue.name === 'Riverview Performing Arts Center' && (
                        <div className="pt-12 flex items-center justify-center flex-col relative">
                          <h1 className="text-xl mb-6 text-center font-changa">First Floor</h1>
                          <RiverviewPACFirstFloorSVG setRiverview={setRiverview} />
                        </div>
                      )}
                      {venue.name === 'SCF Neel Performing Arts Center' && (
                        <div className="flex items-center justify-center flex-col relative">
                          <h1 className="text-xl mb-6 text-center font-changa">First Half</h1>
                          <SCFNeelPACSVG setNeel={setNeel} />
                        </div>
                      )}
                    </div>
                  </div>
                  {venue.name === 'Riverview Performing Arts Center' && (
                    <>
                      <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-white font-lato text-sm">
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
                          <div className="pl-4">{riverview.level}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
                          <div className="pl-4">{riverview.seat}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
                          <div className="pl-4">{riverview.price && `$${riverview.price}`}</div>
                        </div>
                      </div>
                      <h1 className="font-changa text-xl text-center mt-12">Balcony</h1>
                      <div className="overflow-hidden w-full overflow-x-auto mt-4">
                        <div className="min-w-[800px] w-full overflow-x-auto">
                          <RiverviewBalconySVG setRiverviewBalcony={setRiverview2} />
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-7 mb-28">
                        <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-white font-lato text-sm">
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
                          <div className="pl-4">{riverview2.level}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
                          <div className="pl-4">{riverview2.seat}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
                          <div className="pl-4">{riverview2.price && `$${riverview2.price}`}</div>
                        </div>
                      </div>
                    </>
                  )}
                  {venue.name === 'SCF Neel Performing Arts Center' && (
                    <>
                      <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-white font-lato text-sm">
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
                          <div className="pl-4">{neel.level}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
                          <div className="pl-4">{neel.seat}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
                          <div className="pl-4">{neel.price && `$${neel.price}`}</div>
                        </div>
                      </div>
                      <h1 className="font-changa text-xl text-center mt-12">Second Half</h1>
                      <div className="overflow-hidden w-full overflow-x-auto mt-6">
                        <div className="min-w-[800px] w-full overflow-x-auto">
                          <SCFNeel2ndHalf setNeel2ndHalf={setNeel2} />
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-7">
                        <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-white font-lato text-sm">
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
                          <div className="pl-4">{neel2.level}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
                          <div className="pl-4">{neel2.seat}</div>
                          <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
                          <div className="pl-4">{neel2.price && `$${neel2.price}`}</div>
                        </div>
                      </div>
                    </>
                  )}
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
