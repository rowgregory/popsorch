import React from 'react'
import LogoSVG from '../svg/LogoSVG'
import Link from 'next/link'
import TicketSVG from '../svg/TicketSVG'
import Picture from '../common/Picture'
import BurgerButton from '../BurgerButton'
import { useAppDispatch } from '@/app/redux/store'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'

const HomeHeader = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="px-4 md:px-12 absolute top-0 left-0 w-full h-36 z-50">
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between py-1.5">
        <Link href="/" className="flex items-end">
          <Picture src="/images/robyn.png" className="w-auto h-[72px] md:h-[135px]" priority={true} />
          <LogoSVG className="mb-1 text-white" />
        </Link>
        <div className="flex items-center 576:gap-x-16">
          <Link
            href="https://ci.ovationtix.com/35505"
            target="_blank"
            className="bg-blaze text-white text-sm md:text-base px-7 h-8 md:h-auto md:px-10 md:py-3.5 rounded-md md:rounded-lg font-bold border-2 duration-300 border-blaze hover:bg-transparent items-center gap-x-3 hidden 576:flex"
          >
            <TicketSVG />
            Buy Tickets
          </Link>
          <BurgerButton onClick={() => dispatch(openNavigationDrawer())} />
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
