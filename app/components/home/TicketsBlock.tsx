import React, { useState } from 'react'
import TitleWithLine from '../common/TitleWithLine'
import { RootState, useAppSelector } from '@/app/redux/store'
import Ticket from './Ticket'

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
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <div className="px-4 py-32">
      <div className="max-w-[520px] 760:max-w-screen-576 990:max-w-[800px] 1200:max-w-screen-1160 1590:max-w-screen-1400 mx-auto w-full flex flex-col items-center justify-center">
        <TitleWithLine
          title={textBlockMap?.TICKET_BLOCK?.ticketBlockTitle}
          type="TICKET_BLOCK"
          textBlockKey="ticketBlockTitle"
        />
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
        <div className="mt-12 grid grid-cols-12 gap-y-10 576:gap-10 w-full">
          {tickets.map((ticket, i) => (
            <Ticket key={i} isSeason={isSeason} ticket={ticket} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TicketsBlock
