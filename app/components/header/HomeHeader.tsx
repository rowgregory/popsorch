import React from 'react'
import BurgerButton from './BurgerButton'
import BuyTicketsBtn from './BuyTicketsBtn'
import LogoWRobyn from '../LogoWRobyn'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import DonateBtn from './DonateBtn'
import { useState } from 'react'
import Link from 'next/link'

const HomeHeader = () => {
  const path = useCustomPathname()
  const navLinks = getNavigationLinks(path)

  const [openDropdown, setOpenDropdown] = useState<number>(-1)

  const handleMouseEnter = (index: number) => {
    setOpenDropdown(index)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(-1)
  }

  return (
    <div className="px-4 md:px-12 absolute top-0 left-0 w-full h-36 z-50 bg-black/60">
      <div className="max-w-[1920px] w-full mx-auto flex items-center justify-between py-1.5">
        <LogoWRobyn logoClassname="text-white h-[80px] md:w-[138.2px] md:h-[129.9px]" imgDimensions="h-[72px] md:h-[135px]" />
        <div className="flex items-center gap-x-3 absolute left-1/2 mt-2 -translate-x-1/2 transform">
          {navLinks.map((link, i) => (
            <div key={i}>
              {link.links ? (
                <div className="relative group">
                  <div
                    onMouseEnter={() => handleMouseEnter(i)}
                    className="font-bold uppercase duration-300 cursor-pointer text-white hover:text-blaze"
                  >
                    {link.textKey}
                  </div>
                  <div
                    onMouseLeave={handleMouseLeave}
                    className={`${
                      i === openDropdown ? 'opacity-100 group-hover:opacity-100 block' : 'opacity-0 hidden'
                    } flex flex-col py-2 mt-2 absolute left-0 top-full bg-black/80 shadow-lg z-50 w-fit transition-opacity duration-300`}
                  >
                    {link.links.map((sublink, j) => (
                      <Link
                        key={j}
                        href={sublink.linkKey}
                        target={sublink.isExternal ? '_blank' : '_self'}
                        className="font-bold px-4 py-2 text-white hover:bg-blaze duration-300 whitespace-nowrap"
                      >
                        {sublink.textKey}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  onMouseEnter={handleMouseLeave}
                  href={link.linkKey}
                  className={`pb-3 font-bold duration-300 hover:text-blaze uppercase ${link.active ? 'text-blaze' : 'text-white'}`}
                >
                  {link.textKey}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center 576:gap-x-5">
          <BuyTicketsBtn />
          <DonateBtn />
          <BurgerButton bgColor="bg-white" />
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
