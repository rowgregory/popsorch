'use client'

import React from 'react'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import EditableTextArea from '../common/EditableTextArea'
import { RootState, useAppSelector } from '@/app/redux/store'

const SeasonTicketInfoBanner = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 py-40">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col 1200:flex-row gap-y-28 990:gap-x-28 items-center">
        <video
          src="/videos/ticket-banner.mp4"
          className="aspect-square w-full h-auto max-h-[600px] rounded-lg"
          controls={false}
          autoPlay={true}
          loop={true}
          muted
          preload="metadata"
          playsInline
        >
          <source src="/videos/ticket-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="flex flex-col">
          <EditableTextArea
            tag="h4"
            initialValue={textBlockMap?.HOME_SEASON_TICKET_INFO_BANNER?.homeSeasonTicketInfoBannerTitle}
            type="HOME_SEASON_TICKET_INFO_BANNER"
            textBlockKey="homeSeasonTicketInfoBannerTitle"
            className="font-changa text-4xl font-medium mb-7 text-center"
          />
          <p className="font-lato tracking-wider text-zinc-100 mb-3">
            To ensure your same seats from last season, or to change those seats and/or add new seats to your order,
            call our First Chair Box Office Manager, Terry Fazio, at
            <a href="tel:19419267677" className="text-blaze underline">
              941-926-POPS (7677)
            </a>{' '}
            or email her at{' '}
            <a href="mailto:Tickets@ThePopsOrchestra.org" className="text-blaze underline">
              Tickets@ThePopsOrchestra.org
            </a>
            .
          </p>
          <p className="font-lato tracking-wider text-zinc-100 mb-3">
            If you were not a season ticket holder last year but would like to purchase season tickets for this year,
            you may do that starting on <span className="text-blaze font-semibold">Monday, June 16</span>.
          </p>
          <p className="font-lato tracking-wider text-zinc-100 mb-3">
            If you only want to purchase single show tickets for next season, you may do that starting on{' '}
            <span className="text-blaze font-semibold">Friday, August 1</span>.
          </p>
          <p className="font-lato tracking-wider text-zinc-100">
            If you purchase the <span className="italic">“Add On”</span> shows at the same time as your season ticket
            package, the reduced season ticket price will remain in effect. The cost of all tickets goes to full price
            on <span className="text-blaze font-semibold">Friday, August 1</span>.
          </p>

          <div className="mt-12 mx-auto 1200:mx-0">
            <CallBoxOfficeBtn />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonTicketInfoBanner
