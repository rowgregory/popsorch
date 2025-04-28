import React, { FC, useMemo } from 'react'
import Picture from '../common/Picture'
import { ConcertProps } from '@/app/redux/features/formSlice'
import Link from 'next/link'
import { formatDate } from '@/app/utils/date.functions'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

const PublicConcertRow: FC<{ concert: ConcertProps }> = ({ concert }) => {
  const memoizedImageUrl = useMemo(() => concert?.imageUrl, [concert?.imageUrl])

  return (
    <div className="grid grid-cols-12 bg-duskgray rounded-md w-full">
      <div className="col-span-12 990:col-span-5 relative group">
        <Picture
          src={memoizedImageUrl}
          priority={true}
          className="aspecet-video 990:aspect-square relative z-0 object-cover rounded-tl-md rounded-bl-md h-full w-full bg-black"
        />
        <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-transparent duration-300 flex flex-col items-end p-5">
          <div className="flex flex-col items-center text-white font-medium">
            <h1 className="uppercase text-12 font-changa -mb-3">From</h1>
            <h2 className="font-lato text-[40px]">$35</h2>
            <h3 className="uppercase text-12 font-changa -mt-3">Per Ticket</h3>
          </div>
        </div>
      </div>
      <div className="col-span-12 990:col-span-7 p-9 w-full">
        <h2 className="text-[#b2b2b2] font-changa text-12">Posted on {formatDate(concert?.createdAt)}</h2>
        <h1 className="text-[30px] font-changa text-white">{concert?.name}</h1>
        <div className="w-full h-[1px] bg-zinc-700/70 my-6"></div>
        <p className="font-lato text-[#b2b2b2] leading-relaxed tracking-wide mb-10">{concert?.pressRelease}</p>
        <div className="flex flex-col 576:flex-row items-center gap-y-4 576:gap-x-4">
          {concert?.isOnSale ? (
            <Link
              href={concert?.allSeriesExternalLink}
              target="_blank"
              className="bg-blaze text-white hover:text-duskgray px-9 duration-300 rounded-sm py-[19px] font-changa text-12 uppercase w-full flex items-center justify-center font-bold"
            >
              Get Tickets
            </Link>
          ) : (
            <CallBoxOfficeBtn className="w-full py-5 text-center" />
          )}
          <Link
            href={`/concerts/${concert?.id}`}
            className="bg-white text-blaze hover:text-duskgray px-9 duration-300 rounded-sm py-[19px] font-changa text-12 uppercase w-full 576:w-fit flex justify-center items-center font-bold whitespace-nowrap"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublicConcertRow
