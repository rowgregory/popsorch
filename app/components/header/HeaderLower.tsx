import { useState } from 'react'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector, useHeaderButtonSelector, useUserSelector } from '@/app/redux/store'
import { getNavigationLinks } from '@/app/utils/navigation.utils'
import { useHeaderAtTop } from '@/app/hooks/useHeaderAtTop'
import { HeaderNavLink } from './HeaderNavLink'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'

const HeaderLower = ({ concerts }) => {
  const path = useCustomPathname()
  const dispatch = useAppDispatch()
  const { isFeatureToggleCardLive, isFeatureToggleCardVisible } = useAppSelector((state: RootState) => state.app)
  const { user } = useUserSelector()
  const { headerButton } = useHeaderButtonSelector()
  const thereAreConcerts = concerts?.concerts?.length > 0
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
      } transition-all w-full px-4 pt-2 430:px-7 1280:px-14 flex items-center justify-between relative z-50 h-[100px]`}
    >
      <Link
        href="/"
        className={`${
          isHome ? 'bg-golden50Logo' : 'bg-white50Logo'
        } bg-no-repeat bg-contain bg-center w-24 1200:w-40 h-[80px]`}
      />

      <motion.div
        className="hidden 1360:flex items-center px-5 gap-x-5 h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {navLinks.map((link, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              type: 'spring',
              stiffness: 100
            }}
            whileTap={{ scale: 0.95 }}
          >
            {link.isButton ? (
              <HeaderNavLink
                link={link}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                linkClassname="text-white"
              />
            ) : (
              <HeaderNavLink link={link} setOpenDropdown={setOpenDropdown} linkClassname="text-white" />
            )}
          </motion.div>
        ))}
      </motion.div>
      <div className="flex items-center gap-x-4">
        <Menu
          onClick={() => dispatch(openNavigationDrawer())}
          className="w-6 h-6 text-white 1360:hidden block duration-300 hover:text-blaze cursor-pointer"
        />
        <div className="hidden 1360:flex space-x-4">
          {headerButton?.type === 'double' && headerButton.secondaryButton ? (
            // Double Button
            <>
              <CustomHeaderButton
                {...headerButton}
                text={headerButton.text}
                link={headerButton.link}
                linkType={headerButton.linkType}
                backgroundColor={headerButton.backgroundColor}
                fontColor={headerButton.fontColor}
                animation={headerButton.animation}
              />
              <CustomHeaderButton
                {...headerButton}
                text={headerButton.secondaryButton.text}
                link={headerButton.secondaryButton.link}
                linkType={headerButton.secondaryButton.linkType}
                backgroundColor={headerButton.backgroundColor}
                fontColor={headerButton.fontColor}
                animation={headerButton.animation}
              />
            </>
          ) : (
            // Single Button
            <CustomHeaderButton {...headerButton} />
          )}
        </div>
      </div>
    </nav>
  )
}

export default HeaderLower
