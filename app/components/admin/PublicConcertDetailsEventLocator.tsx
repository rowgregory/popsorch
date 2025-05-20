import { formatDate } from '@/app/utils/date.functions'
import React, { FC } from 'react'
import BuyTicketsBtn from '../common/BuyTicketsBtn'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

interface PublicConcertDetailsEventLocatorProps {
  setEventDetails: any
  detail: any
  eventDetails: any
  isOnSale: boolean
}

const PublicConcertDetailsEventLocator: FC<PublicConcertDetailsEventLocatorProps> = ({
  setEventDetails,
  detail,
  eventDetails,
  isOnSale
}) => {
  return (
    <div className="flex flex-col">
      <div
        onClick={() => setEventDetails(detail)}
        className={`${
          eventDetails?.location?.name === detail?.location?.name && 'bg-midnightblack'
        } cursor-pointer hover:bg-[#2a2a2a] h-fit rounded-md duration-300 px-2 p-2 -ml-2 relative mb-8`}
      >
        <>
          <div className="grid grid-cols-12 gap-x-2 font-lato mb-2">
            <div className="col-span-3 text-white font-bold">Venue: </div>
            <span className="col-span-9 text-[#818181]">{detail?.location.name}</span>
          </div>
          <div className="grid grid-cols-12 gap-x-2 font-lato mb-2">
            <div className="col-span-3 text-white font-bold">Date: </div>
            <span className="col-span-9 text-[#818181]">{formatDate(detail?.date)}</span>
          </div>
          <div className="grid grid-cols-12 gap-x-2 font-lato mb-2">
            <div className="col-span-3 text-white font-bold">Time: </div>
            <span className="col-span-9 text-[#818181]">{detail?.time}</span>
          </div>
          <div className="grid grid-cols-12 gap-x-2 font-lato">
            <div className="col-span-3 text-white font-bold">Address: </div>
            <span className="col-span-9 text-[#818181]">{detail?.location?.address}</span>
          </div>
        </>
      </div>
      {isOnSale ? <BuyTicketsBtn link={detail?.externalLink} /> : <CallBoxOfficeBtn />}
    </div>
  )
}

export default PublicConcertDetailsEventLocator
