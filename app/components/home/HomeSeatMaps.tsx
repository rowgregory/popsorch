'use client'

import React, { useState } from 'react'
import TitleWithLine from '../common/TitleWithLine'
import { RootState, useAppSelector } from '@/app/redux/store'
import RiverviewPACFirstFloorSVG from '../svg/RiverviewPACFirstFloorSVG'
import SCFNeelPACSVG from '../svg/SCFNeelPACSVG'
import RiverviewBalconySVG from '../svg/RiverviewBalconySVG'
import SCFNeel2ndHalf from '../svg/SCFNeel2ndHalf'

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

const HomeSeatMaps = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const [neel, setNeel] = useState<SVGProps>(SVGinitialState)
  const [neel2ndHalf, setNeel2ndHalf] = useState<SVGProps>(SVGinitialState)
  const [riverview, setRiverview] = useState<SVGProps>(SVGinitialState)
  const [riverviewBalcony, setRiverviewBalcony] = useState<SVGProps>(SVGinitialState)

  return (
    <div className="px-4 py-40">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] mx-auto w-full flex flex-col items-center justify-center">
        <TitleWithLine
          title={textBlockMap?.SEAT_MAP_BLOCK?.seatMapBlockTitle}
          type="SEAT_MAP_BLOCK"
          textBlockKey="seatMapBlockTitle"
        />
        <p className="font-changa uppercase text-13 text-sunburst">
          Scroll over each square to check each seat type, number, and price
        </p>
        <h1 className="font-changa text-xl text-center mt-12">Riverview Performing Arts Center</h1>
        <div className="overflow-hidden w-full overflow-x-auto mt-4">
          <div className="min-w-[800px] w-full overflow-x-auto">
            <RiverviewPACFirstFloorSVG setRiverview={setRiverview} />
          </div>
        </div>
        <div className="flex items-center justify-center mt-7 mb-12">
          <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-[#b2b2b2] font-lato text-sm">
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
            <div className="pl-4">{riverview.level}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
            <div className="pl-4">{riverview.seat}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
            <div className="pl-4">{riverview.price && `$${riverview.price}`}</div>
          </div>
        </div>
        <h1 className="font-changa text-xl text-center mt-12">Riverview Performing Arts Center Balcony</h1>
        <div className="overflow-hidden w-full overflow-x-auto mt-4">
          <div className="min-w-[800px] w-full overflow-x-auto">
            <RiverviewBalconySVG setRiverviewBalcony={setRiverviewBalcony} />
          </div>
        </div>
        <div className="flex items-center justify-center mt-7 mb-28">
          <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-[#b2b2b2] font-lato text-sm">
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
            <div className="pl-4">{riverviewBalcony.level}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
            <div className="pl-4">{riverviewBalcony.seat}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
            <div className="pl-4">{riverviewBalcony.price && `$${riverviewBalcony.price}`}</div>
          </div>
        </div>
        <div className="my-20 w-full h-[1px] bg-zinc-700/70" />
        <h1 className="font-changa text-xl text-center mt-28">Neel SCF Performing Arts Center</h1>
        <div className="overflow-hidden w-full overflow-x-auto mt-6">
          <div className="min-w-[800px] w-full overflow-x-auto">
            <SCFNeelPACSVG setNeel={setNeel} />
          </div>
        </div>
        <div className="flex items-center justify-center mt-7 mb-12">
          <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-[#b2b2b2] font-lato text-sm">
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
            <div className="pl-4">{neel.level}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
            <div className="pl-4">{neel.seat}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
            <div className="pl-4">{neel.price && `$${neel.price}`}</div>
          </div>
        </div>
        <h1 className="font-changa text-xl text-center mt-12">Neel SCF Performing Arts Center Second Half</h1>
        <div className="overflow-hidden w-full overflow-x-auto mt-6">
          <div className="min-w-[800px] w-full overflow-x-auto">
            <SCFNeel2ndHalf setNeel2ndHalf={setNeel2ndHalf} />
          </div>
        </div>
        <div className="flex items-center justify-center mt-7">
          <div className="grid grid-cols-2 gap-y-4 py-3 border-y border-zinc-700/70 text-[#b2b2b2] font-lato text-sm">
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Level</div>
            <div className="pl-4">{neel2ndHalf.level}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Seat</div>
            <div className="pl-4">{neel2ndHalf.seat}</div>
            <div className="font-semibold text-right pr-4 border-r border-[#555]">Price</div>
            <div className="pl-4">{neel2ndHalf.price && `$${neel2ndHalf.price}`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSeatMaps
