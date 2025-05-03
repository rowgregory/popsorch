import React from 'react'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

const HomeDiscount = () => {
  return (
    <div className="px-4 py-32">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col 1200:flex-row gap-x-28 items-center">
        <div className="flex gap-2">
          <h1 className="text-[180px] 430:text-[200px] 576:text-[240px] tracking-tight font-lato font-semibold text-blaze">
            23
          </h1>
          <div className="flex flex-col items-end">
            <h2 className="text-blaze font-lato text-[115px] 430:text-[150px] font-semibold mr-[22px] 430:mr-[3px]">
              %
            </h2>
            <h3 className="font-lato text-[70px] 430:text-[70px] text-white uppercase font-semibold -mt-12">Off</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="font-changa text-4xl font-medium mb-7 text-center">
            Save Big When You Renew Your Season Subscription Starting May 1!
          </h4>
          <p className="font-lato tracking-wider text-zinc-100 mb-3">
            To ensure your same seats from last season, or to change those seats and/or add new seats to your order,
            call our First Chair Box Office Manager, Terry Fazio, at{' '}
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

export default HomeDiscount
