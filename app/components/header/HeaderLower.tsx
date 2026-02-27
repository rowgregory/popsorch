import { useState } from 'react'
import { useAppDispatch, useHeaderButtonSelector } from '@/app/redux/store'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import { useHeaderAtTop } from '@/app/hooks/useHeaderAtTop'
import { HeaderNavLink } from './HeaderNavLink'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const HeaderLower = ({ concerts, campApplicationsSetting }) => {
  const path = usePathname()
  const dispatch = useAppDispatch()
  const { headerButton } = useHeaderButtonSelector()
  const thereAreConcerts = concerts?.concerts?.length > 0
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'
  const { headerRef } = useHeaderAtTop()

  return (
    <nav
      ref={headerRef}
      className={`${
        !isHome && 'bg-headerbg bg-cover bg-no-repeat bg-center'
      } transition-all w-full px-4 sm:px-7 1280:px-14 flex items-center justify-between relative z-50 h-16 sm:h-20`}
      role="navigation"
      aria-label="Main site navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        className={`${
          isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
        } bg-no-repeat bg-contain bg-center w-16 sm:w-24 1200:w-36 h-12 sm:h-16 shrink-0`}
        aria-label="Boys & Girls Club homepage"
      />

      {/* Desktop Nav */}
      <motion.div
        className="hidden 1160:flex items-center px-4 gap-x-4 h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {navLinks.map((link, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, type: 'spring', stiffness: 100 }}
            whileTap={{ scale: 0.95 }}
          >
            {link.isButton ? (
              <HeaderNavLink
                link={link}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                linkClassname="text-white text-sm"
              />
            ) : (
              <HeaderNavLink link={link} setOpenDropdown={setOpenDropdown} linkClassname="text-white text-sm" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-x-3 shrink-0">
        {/* Mobile menu icon */}
        <button
          onClick={() => dispatch(openNavigationDrawer())}
          className="w-5 h-5 sm:w-6 sm:h-6 text-white 1160:hidden block duration-300 hover:text-blaze"
          aria-label="Open mobile navigation menu"
        >
          <Menu />
        </button>

        {/* Desktop buttons */}
        <div className="hidden 1160:flex gap-x-3">
          {headerButton?.type === 'double' && headerButton.secondaryButton ? (
            <>
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
            </>
          ) : (
            <CustomHeaderButton {...headerButton} aria-label={headerButton.text} />
          )}
        </div>
      </div>
    </nav>
  )
}
