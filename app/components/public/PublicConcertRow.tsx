import React, { FC, useMemo } from 'react'
import Picture from '../common/Picture'
import Link from 'next/link'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { ConcertProps } from '@/app/redux/features/concertSlice'
import { useRouter } from 'next/navigation'

const PublicConcertRow: FC<{ concert: ConcertProps }> = ({ concert }) => {
  const memoizedImageUrl = useMemo(() => concert?.imageUrl, [concert?.imageUrl])
  const { push } = useRouter()

  return (
    <div
      onClick={() => push(`/concerts/${concert?.id}`)}
      className="grid grid-cols-12 bg-duskgray rounded-md w-full group cursor-pointer"
    >
      <div className="col-span-12 990:col-span-5 relative overflow-hidden">
        <Picture
          src={memoizedImageUrl}
          priority={true}
          className="aspecet-video 990:aspect-square relative z-0 object-cover rounded-tl-md rounded-bl-md h-full w-full bg-black group-hover:scale-110 duration-300"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent from-[60%] to-black/50 to-[100%] duration-300 flex flex-col items-end p-5">
          <h3 className="bg-blaze group-hover:bg-sunburst duration-300 py-0.5 px-3 font-changa text-sm uppercase absolute left-3 top-3">
            {concert?.type}
          </h3>
          <div className="flex flex-col items-center text-white font-medium">
            <h1 className="uppercase text-12 font-changa -mb-3">From</h1>
            <h2 className="font-lato text-[40px]">$35</h2>
            <h3 className="uppercase text-12 font-changa -mt-3">Per Ticket</h3>
          </div>
        </div>
      </div>
      <div className="col-span-12 990:col-span-7 p-9 w-full">
        <h1 className="text-[30px] font-changa duration-300 group-hover:text-sunburst">{concert?.name}</h1>
        <h4 className="w-full font-lato text-12 uppercase font-change text-sunburst leading-7 mb-10">
          {concert.cardDate}
        </h4>
        <div className="w-full h-[1px] bg-zinc-700/70 my-6"></div>
        <p className="font-lato text-white leading-relaxed tracking-wide mb-10">{concert?.pressRelease}</p>
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
        </div>
      </div>
    </div>
  )
}

export default PublicConcertRow
