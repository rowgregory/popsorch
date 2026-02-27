import Link from 'next/link'
import { HeaderLower } from './HeaderLower'

export const Header = ({ concerts, campApplicationsSetting }) => {
  return (
    <>
      {/* Top header / utility bar */}
      <header
        className="bg-neutral-900 border-b border-neutral-800 430:px-7"
        role="banner"
        aria-label="Top utility navigation"
      >
        <div className="mx-auto">
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
      />
    </>
  )
}
