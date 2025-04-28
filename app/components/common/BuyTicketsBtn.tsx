import Link from 'next/link'
import React, { FC } from 'react'

const BuyTicketsBtn: FC<{ link: string; className?: string }> = ({ link, className }) => {
  return (
    <Link
      href={link}
      target="_blank"
      className={`${
        className ?? 'py-4 w-fit'
      } bg-blaze font-changa uppercase whitespace-nowrap px-8 rounded-sm text-[12px] font-bold tracking-widest hover:bg-blazehover duration-300`}
    >
      Buy Tickets
    </Link>
  )
}

export default BuyTicketsBtn
