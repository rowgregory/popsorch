import React, { FC, JSX } from 'react'
import CheckmarkWCircle from './svg/CheckmarkWCircle'
import AdmissionTicketSVG from './svg/AdmissionTicketSVG'
import Link from 'next/link'

const Ticket: FC<{ icon: JSX.Element; type: string; price: string; details: string[]; i: number }> = ({
  icon,
  type,
  price,
  details,
  i
}) => {
  return (
    <div className="col-span-12 760:col-span-6 1200:col-span-4">
      <div className="p-9 border-b-0 border-x-2 border-t-2 990:border-x-2 990:border-t-2  border-x-silver dark:border-x-deepspaceblue border-t-silver dark:border-t-deepspaceblue rounded-tl-3xl rounded-tr-3xl dark:bg-cosmicabyss">
        {icon}
        <h1 className="text-xl font-bold text-gunmetal dark:text-gray-200 mt-2.5">{type}</h1>
        <h1 className="text-[60px] 430:text-[72px] font-bold text-blaze mt-3 flex gap-x-2 items-baseline">
          ${price}
          <span className="text-slategray dark:text-mutedslate text-xl">/ person</span>
        </h1>
        <div className="flex flex-col gap-y-2 mt-8">
          {details.map((detail, j) => (
            <div key={j} className="flex items-center gap-x-2.5">
              <CheckmarkWCircle />
              <div className="text-mutedslate text-lg tracking-tighter">{detail}</div>
            </div>
          ))}
        </div>
      </div>
      <AdmissionTicketSVG />
      <div className="p-9 border-2 border-t-0 border-x-silver dark:border-x-deepspaceblue border-b-silver dark:border-b-deepspaceblue rounded-bl-3xl rounded-br-3xl dark:bg-cosmicabyss flex items-center justify-center">
        <Link
          href="https://ci.ovationtix.com/35505"
          target="_blank"
          className={`${
            i === 0 ? 'bg-blaze text-white' : ''
          } text-gunmetal dark:text-white border-2 border-blaze rounded-lg px-9 py-3 font-bold hover:bg-blaze duration-300 hover:text-white`}
        >
          Buy Now
        </Link>
      </div>
    </div>
  )
}

export default Ticket
