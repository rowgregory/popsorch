import React, { useState } from 'react'
import LogoWRobyn from '../LogoWRobyn'
import BurgerButton from './BurgerButton'
import BuyTicketsBtn from './BuyTicketsBtn'
import DonateBtn from './DonateBtn'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import Link from 'next/link'
import AwesomeIcon from '../common/AwesomeIcon'
import { minusIcon, plusIcon } from '@/app/lib/icons'
import WaveText from '../common/WaveText'

const Header = () => {
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
    <header className="w-full">
      <div className="bg-zinc-800 w-full text-white">
        <WaveText text="THRILLING PERFORMANCES BY THE POPS ORCHESTRA SARASOTA-BRADENTON" />
      </div>
      <div className="px-4 md:px-12 py-4">
        <div className="max-w-[860px] w-full mx-auto flex items-center justify-between py-1.5">
          <LogoWRobyn logoClassname="md:h-[250px]" imgDimensions="h-[72px] md:h-[250px]" />
          <div className="flex flex-col items-center 576:gap-y-5">
            <BuyTicketsBtn />
            <DonateBtn />
            <BurgerButton bgColor="bg-zinc-800" />
          </div>
        </div>
        <div className="flex items-center gap-x-5 justify-center pt-7 pb-3">
          {navLinks.map((link, i) => (
            <div key={i}>
              {link.links ? (
                <div className="relative group">
                  <div
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    className={`${
                      link.active ? 'text-blaze' : ''
                    } text-lg font-bold duration-300 cursor-default hover:text-blaze flex items-center gap-x-1`}
                  >
                    {link.textKey}{' '}
                    <AwesomeIcon
                      icon={link.active || i === openDropdown ? plusIcon : minusIcon}
                      className={`${link.active || i === openDropdown ? 'text-blaze' : ''} w-3 h-3`}
                    />
                    <div
                      className={`${
                        i === openDropdown
                          ? 'opacity-100 group-hover:opacity-100 group-hover:translate-y-0 visible'
                          : 'opacity-0 translate-y-3 invisible'
                      } flex flex-col py-2 absolute left-0 top-full bg-black/80 shadow-navdropdown z-50 w-fit transition-all duration-300 transform`}
                    >
                      {link.links.map((sublink, j) => (
                        <Link
                          key={j}
                          href={sublink.linkKey}
                          target={sublink.isExternal ? '_blank' : '_self'}
                          className={`${
                            sublink.active ? 'text-blaze hover:bg-white' : 'text-white hover:bg-blaze'
                          } text-lg font-bold px-4 py-2  duration-300 whitespace-nowrap`}
                        >
                          {sublink.textKey}
                        </Link>
                      ))}
                    </div>
                  </div>{' '}
                </div>
              ) : (
                <Link
                  onMouseEnter={handleMouseLeave}
                  href={link.linkKey}
                  className={`text-lg pb-3 font-bold duration-300 hover:text-blaze ${link.active ? 'text-blaze' : ''}`}
                >
                  {link.textKey}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
