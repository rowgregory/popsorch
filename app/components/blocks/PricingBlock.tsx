import Link from 'next/link'
import React from 'react'
import TicketSVG from '../svg/TicketSVG'

const tickets = [
  {
    type: 'General Seating',
    price: '35',
    details: ['Great live music', 'Budget-friendly', 'Fun night out']
  },
  {
    type: 'Premium Seating',
    price: '50',
    details: ['Upgraded experience', 'Better acoustics', 'Closer to the action']
  },
  {
    type: 'Ultra Seating',
    price: '65',
    details: ['Best view', 'Exclusive experience', 'Immersive sound']
  }
]

const PricingBlock = () => {
  return (
    <div className="bg-charcoalblue px-3 py-36">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative flex flex-col justify-center items-center">
        <h1 className="font-oswald text-[56px] text-white mb-5">Pricing</h1>
        <p className="text-lg font-raleway text-white w-full max-w-2xl text-center mb-20">
          Enjoy world-class performances that inspire and entertain. Secure your tickets today for an unforgettable
          musical experience.
        </p>
        <div className="grid grid-cols-12 gap-y-10 576:gap-x-10 w-full">
          {tickets.map((ticket, i) => (
            <div
              className={`${
                i === 1 ? 'bg-blaze' : ''
              } hover:bg-sunburst duration-150 col-span-12 990:col-span-4 p-5 aspect-square w-full h-full group`}
              key={i}
            >
              <div className="border-3 border-sunburst group-hover:border-white p-4 flex flex-col items-center justify-center w-full h-full duration-150">
                <h1 className="text-white text-[56px] font-black font-inter flex items-center gap-x-1">
                  <span className="text-xl font-bold">$</span>
                  {ticket.price}
                </h1>
                <h2 className="font-oswald text-white text-lg">{ticket.type}</h2>
                <div className="border-b-1 border-b-sunburst group-hover:border-b-white w-full my-5 duration-150" />
                <ul className="flex flex-col gap-y-2 mb-7">
                  {ticket.details.map((detail, j) => (
                    <ul className="font-light text-center text-white font-raleway text-sm font" key={j}>
                      {detail}
                    </ul>
                  ))}
                </ul>
                <Link
                  href=""
                  className={`${
                    i === 1 ? 'bg-charcoalblue' : 'bg-blaze'
                  } px-4 py-1.5 text-white font-oswald uppercase flex items-center gap-x-2`}
                >
                  <TicketSVG />
                  Purchase Tickets
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingBlock
