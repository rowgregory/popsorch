import React, { useState } from 'react'
import TitleWithLine from '../common/TitleWithLine'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

const tickets = [
  {
    type: 'Ultra',
    seasonTicket: {
      price: 200,
      perShow: 50,
      includesAddOns: true
    },
    individualTicket: {
      price: 65,
      includesAddOns: false
    },
    savings: 23
  },
  {
    type: 'Premium',
    seasonTicket: {
      price: 165,
      perShow: 41.25,
      includesAddOns: true
    },
    individualTicket: {
      price: 50,
      includesAddOns: false
    },
    savings: 17.5
  },
  {
    type: 'General',
    seasonTicket: {
      price: 120,
      perShow: 30,
      includesAddOns: true
    },
    individualTicket: {
      price: 35,
      includesAddOns: false
    },
    savings: 14
  }
]

const TicketsBlock = () => {
  const [ticketType, setTicketType] = useState('season')
  const isSeason = ticketType === 'season'
  const isSingle = ticketType === 'single'

  return (
    <div className="px-4 py-32">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center justify-center">
        <TitleWithLine title="Season Tickets" />
        <div className="mt-10 mb-8 flex items-center justify-center max-w-screen-576 uppercase font-lato font-17 border-b-2 border-midnightblack w-full">
          <button
            onClick={() => setTicketType('season')}
            className={`${isSeason ? 'bg-midnightblack' : ''} py-2 px-8 duration-300 hover:bg-midnightblack`}
          >
            Season
          </button>
          <button
            onClick={() => setTicketType('single')}
            className={`${isSingle ? 'bg-midnightblack' : ''} py-2 px-8 duration-300 hover:bg-midnightblack`}
          >
            Single
          </button>
        </div>
        <div className="mt-12 grid grid-cols-12 gap-y-10 990:gap-y-0 w-full">
          {tickets.map((ticket, i) => (
            <div
              key={i}
              className={`col-span-12 576:col-span-6 990:col-span-4 px-10 py-12 flex flex-col items-center justify-between min-h-[500px]`}
            >
              <h2 className="text-2xl font-changa font-medium text-white mb-2">{ticket.type}</h2>
              <p className="text-white mb-1 text-center font-medium font-changa text-[70px]">
                ${isSeason ? ticket.seasonTicket.price : ticket.individualTicket.price}
              </p>
              <div className="w-full h-[1px] bg-zinc-700/70 my-8" />
              <p className="text-zinc-300 font-lato mb-5 text-center">
                {isSeason ? 'Includes Add On shows at discounted rate' : 'Full price applies to all Add-On shows'}
              </p>
              {isSeason && (
                <p className="text-zinc-300 font-lato flex flex-col text-center mb-12">
                  Price per Show
                  <span className="text-blaze font-lato font-semibold">${ticket.seasonTicket.perShow}</span>
                </p>
              )}
              <CallBoxOfficeBtn />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketsBlock
