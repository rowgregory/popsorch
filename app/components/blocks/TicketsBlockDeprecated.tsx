import React from 'react'
import AnimatedSectionHeader from '../common/AnimatedSectionHeader'
import useAnimatedSectionTitle from '@/app/hooks/useAnimatedSectionTitle'
import GeneralTicketSVG from '../svg/GeneralTicketSVG'
import DiamondSVG from '../svg/DiamondSVG'
import StarSVG from '../svg/StarSVG'
import Ticket from '../Ticket'

const tickets = [
  {
    icon: <GeneralTicketSVG />,
    type: 'General Seating',
    price: '35',
    details: ['Great live music', 'Budget-friendly', 'Fun night out']
  },
  {
    icon: <StarSVG />,
    type: 'Premium Seating',
    price: '50',
    details: ['Upgraded experience', 'Better acoustics', 'Closer to the action']
  },
  {
    icon: <DiamondSVG />,
    type: 'Ultra Seating',
    price: '65',
    details: ['Best view', 'Exclusive experience', 'Immersive sound']
  }
]

const TicketsBlockDeprecated = () => {
  const { ref, visible } = useAnimatedSectionTitle(0.2)

  return (
    <div className="dark:bg-shadowblue px-4 py-14 md:px-12 md:py-24">
      <div className="max-w-[516px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1160px] 1400:max-w-1320 w-full mx-auto relative grid grid-cols-12 gap-y-16 md:gap-x-10">
        <div className="col-span-12">
          <AnimatedSectionHeader title="Ticket" />
          <div
            ref={ref}
            className={`transition-opacity duration-700 ${
              visible ? 'opacity-100' : 'opacity-0'
            } text-[47px] 430:text-[60px] text-irongray dark:text-white font-bold mt-1`}
          >
            The Pops
          </div>
          <div className="flex flex-col 990:flex-row 990:items-start 990:justify-between w-full">
            <h3 className="text-[47px] 430:text-[60px] font-bold text-blaze -mt-8">Admissions</h3>
            <p className="text-lg font-semibold text-slategray dark:text-slatemist text-left 990:text-right 990:-mt-3 max-w-2xl">
              Enjoy world-class performances that inspire and entertain. Secure your tickets today for an unforgettable
              musical experience.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-y-9 760:gap-x-9 mt-20">
            {tickets.map((ticket, i) => (
              <Ticket key={i} {...ticket} {...{ i }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketsBlockDeprecated
