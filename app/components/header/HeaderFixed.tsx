import { useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import useScrollFromTop from '@/app/hooks/useScrollFromTop'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import { HeaderNavLink } from './HeaderNavLink'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

const HeaderFixed = ({ concerts, campApplicationsSetting }) => {
  const dispatch = useAppDispatch()
  const hasScrolled = useScrollFromTop(160)
  const path = usePathname()
  const { headerButton } = useAppSelector((state: RootState) => state.headerButton)
  const thereAreConcerts = concerts?.concerts?.length > 0
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'

  return (
    <div
      className={`${
        path.includes('/admin') ? 'hidden' : 'block'
      } fixed flex items-center z-70 top-0 left-0 w-full h-14 sm:h-16 bg-duskgray transition-transform duration-500 px-4 sm:px-7 ${
        hasScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full gap-x-3 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`${
            isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
          } bg-no-repeat bg-contain bg-center w-16 sm:w-24 1200:w-36 h-10 sm:h-12 shrink-0`}
        />

        {/* Centered Nav */}
        <div className="hidden absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 1200:flex items-center gap-x-6 h-full">
          {hasScrolled &&
            navLinks.map((link, i) =>
              link.isButton ? (
                <HeaderNavLink
                  key={i}
                  link={link}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  linkClassname="text-white text-sm"
                  isFixed
                />
              ) : (
                <HeaderNavLink
                  key={i}
                  link={link}
                  setOpenDropdown={setOpenDropdown}
                  linkClassname="text-white text-sm"
                />
              )
            )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-x-3 shrink-0">
          <Menu
            onClick={() => dispatch(openNavigationDrawer())}
            className="w-5 h-5 sm:w-6 sm:h-6 text-white 1200:hidden block duration-300 hover:text-blaze cursor-pointer"
          />
          <CustomHeaderButton {...headerButton} />
        </div>
      </div>
    </div>
  )
}

export default HeaderFixed
