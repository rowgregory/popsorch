import Link from 'next/link'
import React from 'react'
import TicketSVG from '../svg/TicketSVG'

const BuyTicketsBtn = () => {
  return (
    <Link
      href="https://ci.ovationtix.com/35505"
      target="_blank"
      className="bg-blaze text-white text-sm md:text-base px-7 h-8 md:h-auto md:px-10 md:py-3.5 rounded-md md:rounded-lg font-bold border-2 duration-300 border-blaze hover:bg-transparent items-center gap-x-3 hidden 576:flex"
    >
      <TicketSVG />
      Buy Tickets
    </Link>
  )
}

export default BuyTicketsBtn
