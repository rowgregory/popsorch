import Link from 'next/link'
import { HeaderLower } from './HeaderLower'

export const Header = ({ concerts, campApplicationsSetting, headerButton }) => {
  return (
    <>
      {/* Top header / utility bar */}
      <header className="px-4 990:px-8 1200:px-12" role="banner" aria-label="Top utility navigation">
        <div className="w-full mx-auto max-w-130 760:max-w-xl 990:max-w-200 1200:max-w-screen-1160 1590:max-w-7xl">
          <div className="flex justify-end items-center h-10">
            <Link
              href="/auth/login"
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors duration-300 uppercase font-changa font-medium tracking-wide"
              aria-label="Launch the Boys & Girls Club application"
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Main navigation / header lower section */}
      <HeaderLower
        concerts={concerts}
        campApplicationsSetting={campApplicationsSetting}
        aria-label="Main site navigation"
        headerButton={headerButton}
      />
    </>
  )
}
