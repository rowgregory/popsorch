import React, { useState } from 'react'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import AwesomeIcon from '../common/AwesomeIcon'
import { barsIcon } from '@/app/lib/icons'
import { useHeaderAtTop } from '@/app/hooks/useHeaderAtTop'
import { HeaderNavLink } from './HeaderNavLink'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'

const HeaderLower = () => {
  const path = useCustomPathname()
  const dispatch = useAppDispatch()
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { isFeatureToggleCardLive, isFeatureToggleCardVisible } = useAppSelector((state: RootState) => state.app)
  const { user } = useAppSelector((state: RootState) => state.user)
  const { headerButton } = useAppSelector((state: RootState) => state.headerButton)
  const thereAreConcerts = concerts?.length >= 1
  const navLinks = getNavigationLinks(
    path,
    thereAreConcerts,
    isFeatureToggleCardLive,
    isFeatureToggleCardVisible,
    user.isAdmin
  )
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'
  const { headerRef } = useHeaderAtTop()

  return (
    <nav
      ref={headerRef}
      className={`${
        !isHome && 'bg-headerbg bg-cover bg-no-repeat bg-center'
      } transition-all w-full px-4 pt-2 430:px-7 1280:px-14 flex items-center justify-between relative z-50 h-[110px] 1200:h-[160px]`}
    >
      <Link
        href="/"
        className={`${
          isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
        } bg-no-repeat bg-contain bg-center w-24 1200:w-40 h-[80px] 1200:h-[100px]`}
      />
      <div className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 1200:flex items-center px-5 gap-x-5 h-full">
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
        <div className="hidden 1200:block">
          <CustomHeaderButton {...headerButton} />
        </div>
      </div>
    </nav>
  )
}

export default HeaderLower
