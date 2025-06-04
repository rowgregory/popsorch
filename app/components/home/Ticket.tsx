import React, { FC, useRef } from 'react'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'
import { useInView, motion } from 'framer-motion'

interface TicketTypes {
  isSeason: boolean
  ticket: {
    type: string
    seasonTicket: {
      price: number
      perShow: number
    }
    individualTicket: {
      price: number
    }
  }
  index: number
}

const Ticket: FC<TicketTypes> = ({ isSeason, ticket, index }) => {
  const ref = useRef(null) as any
  const inView = useInView(ref)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`col-span-12 576:col-span-6 990:col-span-4 flex flex-col items-center justify-between min-h-[500px]`}
    >
      <h2 className="text-2xl font-changa font-medium text-white mb-2">{ticket?.type}</h2>
      <p className="text-center font-medium font-changa text-[70px]">
        ${isSeason ? ticket?.seasonTicket?.price : ticket?.individualTicket?.price}
      </p>
      <div className="w-full h-[1px] bg-zinc-700/70 mb-8" />
      <p className="text-white font-lato mb-5 text-center">
        {isSeason ? 'Includes Add On shows at discounted rate' : 'Full price applies to all Add-On shows'}
      </p>
      <p className="text-white font-lato flex flex-col text-center mb-12">
        {isSeason && (
          <>
            Price per Show
            <span className="text-blaze font-lato font-semibold">${ticket?.seasonTicket?.perShow}</span>
          </>
        )}
      </p>
      <CallBoxOfficeBtn />
    </motion.div>
  )
}

export default Ticket
