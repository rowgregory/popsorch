import React, { useState } from 'react'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import AwesomeIcon from '../common/AwesomeIcon'
import { barsIcon } from '@/app/lib/icons'
import { useHeaderAtTop } from '@/app/hooks/useHeaderAtTop'
import { HeaderNavLink } from './HeaderNavLink'
import LogoWRobynHeader from '../LogoWRobynHeader'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import CallBoxOfficeBtn from '../common/CallBoxOfficeBtn'

const HeaderLower = () => {
  const path = useCustomPathname()
  const dispatch = useAppDispatch()
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const thereAreConcerts = concerts?.length >= 1
  const navLinks = getNavigationLinks(path, thereAreConcerts)
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'
  const { headerRef } = useHeaderAtTop()

  return (
    <nav
      ref={headerRef}
      className={`${
        !isHome && 'bg-headerbg bg-cover bg-no-repeat bg-center'
      } transition-all w-full px-4 430:px-7 1280:px-14 flex items-center justify-between relative z-50 h-[160px]`}
    >
      {isHome ? (
        <div
          className={`576:mt-20 relative border-1 border-white after:absolute after:inset-[-10px] after:border after:border-white after:content-[''] px-3 py-4`}
        >
          <LogoWRobynHeader
            imgDimensions={`h-[80px] 576:h-[120px] 760:h-[150px]`}
            logoClassname={`h-[80px] 576:h-[120px] 760:h-[150px] text-blaze`}
          />
        </div>
      ) : (
        <LogoWRobynHeader imgDimensions={`h-[105px]`} logoClassname={`h-[105px] text-blaze`} />
      )}

      <div className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 1200:flex items-center gap-x-10 h-full">
        {navLinks.map((link, i) =>
          link.isButton ? (
            <HeaderNavLink
              key={i}
              link={link}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              linkClassname="text-white"
            />
          ) : (
            <HeaderNavLink key={i} link={link} setOpenDropdown={setOpenDropdown} linkClassname="text-white" />
          )
        )}
      </div>
      <div className="flex items-center gap-x-4">
        <AwesomeIcon
          onClick={() => dispatch(openNavigationDrawer())}
          icon={barsIcon}
          className="w-6 h-6 text-white 1200:hidden block duration-300 hover:text-blaze cursor-pointer"
        />
        <CallBoxOfficeBtn />
      </div>
    </nav>
  )
}

export default HeaderLower
