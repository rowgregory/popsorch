import { useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import useScrollFromTop from '@/app/hooks/useScrollFromTop'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { HeaderNavLink } from './HeaderLower'

const HeaderFixed = ({ concerts, campApplicationsSetting, headerButton }) => {
  const dispatch = useAppDispatch()
  const hasScrolled = useScrollFromTop(160)
  const path = usePathname()
  const thereAreConcerts = concerts?.concerts?.length > 0
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'

  if (path.includes('/admin')) return null

  return (
    <header
      aria-label="Fixed site navigation"
      aria-hidden={!hasScrolled}
      className={`fixed flex items-center z-70 top-0 left-0 w-full h-14 sm:h-20 bg-linear-to-b from-black to-inkblack transition-transform duration-500 px-4 sm:px-7 ${
        hasScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full gap-x-3 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="The Pops Orchestra — return to home page"
          className={`${
            isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
          } bg-no-repeat bg-contain bg-center w-16 sm:w-24 1200:w-36 h-10 sm:h-12 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm`}
        />

        {/* Centered Nav */}
        <nav aria-label="Primary navigation" className="hidden 1200:flex items-center gap-x-6 h-full">
          {hasScrolled &&
            navLinks.map((link, i) => (
              <HeaderNavLink
                key={i}
                link={link}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                linkClassname="text-white text-sm"
              />
            ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-x-3 shrink-0" role="group" aria-label="Site actions">
          <button
            type="button"
            onClick={() => dispatch(openNavigationDrawer())}
            aria-label="Open navigation menu"
            aria-expanded={false}
            aria-controls="navigation-drawer"
            className="1200:hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-duskgray rounded-sm p-1"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white duration-300 hover:text-blaze" aria-hidden="true" />
          </button>

          {headerButton?.type === 'double' && headerButton.secondaryButton ? (
            <div className="flex items-center gap-x-2" role="group" aria-label="Header call to action buttons">
              <CustomHeaderButton
                {...headerButton}
                text={headerButton.text}
                link={headerButton.link}
                linkType={headerButton.linkType}
                backgroundColor={headerButton.backgroundColor}
                fontColor={headerButton.fontColor}
                animation={headerButton.animation}
                aria-label={headerButton.text}
              />
              <CustomHeaderButton
                {...headerButton}
                text={headerButton.secondaryButton.text}
                link={headerButton.secondaryButton.link}
                linkType={headerButton.secondaryButton.linkType}
                backgroundColor={headerButton.backgroundColor}
                fontColor={headerButton.fontColor}
                animation={headerButton.animation}
                aria-label={headerButton.secondaryButton.text}
              />
            </div>
          ) : (
            <CustomHeaderButton {...headerButton} aria-label={headerButton?.text} />
          )}
        </div>
      </div>
    </header>
  )
}

export default HeaderFixed
