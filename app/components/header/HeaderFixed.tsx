import { useState } from 'react'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import useScrollFromTop from '@/app/hooks/useScrollFromTop'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import { HeaderNavLink } from './HeaderNavLink'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { Menu } from 'lucide-react'

const HeaderFixed = () => {
  const dispatch = useAppDispatch()
  const hasScrolled = useScrollFromTop(160)
  const path = useCustomPathname()
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const { headerButton } = useAppSelector((state: RootState) => state.headerButton)
  const { isFeatureToggleCardLive, isFeatureToggleCardVisible } = useAppSelector((state: RootState) => state.app)
  const { user } = useAppSelector((state: RootState) => state.user)
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

  return (
    <div
      className={`${
        path.includes('/admin') ? 'hidden' : 'block'
      } fixed flex items-center z-[70] top-0 left-0 w-full h-[70px] bg-duskgray transition-transform duration-500 px-4 ${
        hasScrolled ? 'translate-y-0' : '-translate-y-[70px]'
      }`}
    >
      <div className="max-w-1200 w-full gap-x-4 mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={`${
            isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
          } bg-no-repeat bg-contain bg-center w-24 1200:w-40 h-14`}
        />
        <div className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 1200:flex items-center gap-x-10 h-full">
          {hasScrolled &&
            navLinks.map((link, i) =>
              link.isButton ? (
                <HeaderNavLink
                  key={i}
                  link={link}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  linkClassname="text-white"
                  isFixed
                />
              ) : (
                <HeaderNavLink key={i} link={link} setOpenDropdown={setOpenDropdown} linkClassname="text-white" />
              )
            )}
        </div>
        <div className="flex items-center gap-x-4">
          <Menu
            onClick={() => dispatch(openNavigationDrawer())}
            className="w-6 h-6 text-white 1200:hidden block duration-300 hover:text-blaze cursor-pointer"
          />
          <CustomHeaderButton {...headerButton} />
        </div>
      </div>
    </div>
  )
}

export default HeaderFixed
