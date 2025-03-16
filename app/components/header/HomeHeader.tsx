import React from 'react'
import BurgerButton from './BurgerButton'
import BuyTicketsBtn from './BuyTicketsBtn'
import LogoWRobyn from '../LogoWRobyn'

const HomeHeader = () => {
  return (
    <div className="px-4 md:px-12 absolute top-0 left-0 w-full h-36 z-50">
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between py-1.5">
        <LogoWRobyn logoClassname="text-white h-[80px] md:w-[138.2px] md:h-[129.9px]" imgDimensions="h-[72px] md:h-[135px]" />
        <div className="flex items-center 576:gap-x-16">
          <BuyTicketsBtn />
          <BurgerButton bgColor="bg-white" />
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
