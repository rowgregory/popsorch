import { FC, useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { getNavigationLinks, NavigationLinksProps } from '@/app/utils/navigation.utils'
import { useHeaderAtTop } from '@/app/hooks/useHeaderAtTop'
import { openNavigationDrawer } from '@/app/redux/features/appSlice'
import Link from 'next/link'
import CustomHeaderButton from '../CustomHeaderButton'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

export interface HeaderNavLinkProps {
  link: NavigationLinksProps
  openDropdown?: { open: boolean; textKey: string }
  setOpenDropdown: (args: { open: boolean; textKey: string }) => void
  linkClassname?: string
  isFixed?: boolean
}

const NavLink: FC<{ link: any; linkClassname?: string }> = ({ link, linkClassname }) => (
  <Link
    href={link.linkKey ?? ''}
    aria-current={link.active ? 'page' : undefined}
    aria-haspopup={link.links ? 'true' : undefined}
    aria-expanded={link['aria-expanded']}
    aria-controls={link['aria-controls']}
    className={`${linkClassname ?? 'text-white'} ${
      link.links ? 'cursor-default' : 'cursor-pointer'
    } relative group font-changa text-sm uppercase tracking-[0.2em] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm`}
  >
    {/* Top flanking line */}
    <span
      aria-hidden="true"
      className={`${
        link.active ? 'scale-x-60' : 'scale-x-0'
      } absolute top-1/2 -mt-3.5 left-0 right-0 h-px bg-white origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-60`}
    />
    {/* Bottom flanking line */}
    <span
      aria-hidden="true"
      className={`${
        link.active ? 'scale-x-60' : 'scale-x-0'
      } absolute top-1/2 mt-3.5 left-0 right-0 h-px bg-white origin-right transition-transform duration-300 ease-in-out group-hover:scale-x-60`}
    />
    <span className="text-white">{link.textKey}</span>
  </Link>
)

export const HeaderNavLink: FC<HeaderNavLinkProps> = ({ link, openDropdown, setOpenDropdown, linkClassname }) => {
  const textKeyMatches = openDropdown?.textKey === link.textKey
  const dropdownId = `dropdown-${link.textKey?.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div
      onMouseEnter={() => setOpenDropdown({ open: true, textKey: link.textKey })}
      onMouseLeave={() => setOpenDropdown({ open: false, textKey: '' })}
      onFocus={() => setOpenDropdown({ open: true, textKey: link.textKey })}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpenDropdown({ open: false, textKey: '' })
        }
      }}
      className="relative flex items-center h-full pb-4 -mb-4"
    >
      <NavLink
        link={{
          ...link,
          'aria-expanded': link.links ? textKeyMatches : undefined,
          'aria-controls': link.links ? dropdownId : undefined
        }}
        linkClassname={linkClassname}
      />

      {link?.links && textKeyMatches && (
        <div
          id={dropdownId}
          role="menu"
          aria-label={`${link.textKey} submenu`}
          className="absolute top-[calc(100%-1rem)] left-1/2 -translate-x-1/2 z-50 bg-black border border-white/10 border-t-2 border-t-blaze flex flex-col min-w-40 w-fit"
        >
          {link.links.map((sublink, j) => (
            <Link
              key={j}
              role="menuitem"
              href={sublink.linkKey}
              onClick={() => setOpenDropdown({ open: false, textKey: '' })}
              target={sublink.isExternal ? '_blank' : undefined}
              rel={sublink.isExternal ? 'noopener noreferrer' : undefined}
              aria-label={sublink.isExternal ? `${sublink.textKey} — opens in new tab` : undefined}
              aria-current={sublink.active ? 'page' : undefined}
              className={`${
                sublink.active ? 'text-blaze' : 'text-white/70 hover:text-white'
              } font-changa text-xs uppercase tracking-[0.2em] px-6 py-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze focus-visible:ring-inset`}
            >
              {sublink.textKey}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export const HeaderLower = ({ concerts, campApplicationsSetting, headerButton }) => {
  const path = usePathname()
  const dispatch = useAppDispatch()
  const thereAreConcerts = concerts?.concerts?.length > 0
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const [openDropdown, setOpenDropdown] = useState({ open: false, textKey: '' })
  const isHome = path === '/'
  const { headerRef } = useHeaderAtTop()

  return (
    <nav
      ref={headerRef}
      role="navigation"
      aria-label="Main site navigation"
      className={`${
        !isHome ? 'bg-headerbg bg-cover bg-no-repeat bg-center' : 'bg-transparent'
      } transition-all relative z-50 px-4 990:px-8 1200:px-12`}
    >
      <div className="w-full mx-auto max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl flex items-center justify-between h-16 sm:h-20 space-x-4">
        {!isHome && (
          <Link
            href="/"
            className={`bg-white50Logo bg-no-repeat bg-contain bg-center w-16 h-12 sm:h-16 shrink-0`}
            aria-label="The Pops Orchestra of Sarasotra and Bradenton logo"
          />
        )}
        {/* Desktop Nav */}
        <div className="hidden 1200:flex items-center gap-x-5 h-full">
          {navLinks.map((link, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <HeaderNavLink
                link={link}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                linkClassname="text-white/80 hover:text-white"
              />
            </motion.div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center justify-between w-full gap-x-3">
          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => dispatch(openNavigationDrawer())}
            aria-label="Open mobile navigation menu"
            className="w-5 h-5 sm:w-6 sm:h-6 text-white/70 hover:text-blaze 1200:hidden transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blaze rounded-sm"
          >
            <Menu aria-hidden="true" />
          </button>

          {/* Desktop CTA buttons */}
          <div className="flex w-full justify-end items-end gap-x-2">
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
              <CustomHeaderButton {...headerButton} aria-label={headerButton?.text} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
