'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { RootState, store, useAppSelector } from '../../redux/store'
import { closeNavigationDrawer } from '../../redux/features/appSlice'
import { getNavigationLinks } from '../../utils/navigation.utils'
import { usePathname } from 'next/navigation'
import { ExternalLink, Heart, X } from 'lucide-react'

const NavigationDrawer = ({ campApplicationsSetting }) => {
  const path = usePathname()
  const { navigationDrawer } = useAppSelector((state: RootState) => state.app)
  const overlayRef = useRef(null)
  const thereAreConcerts = true
  const navLinks = getNavigationLinks(path, thereAreConcerts, campApplicationsSetting)
  const closeDrawer = () => store.dispatch(closeNavigationDrawer())

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`${
          navigationDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } fixed inset-0 z-99 bg-black/70 backdrop-blur-sm transition-opacity duration-500`}
      />

      {/* Panel */}
      <div
        ref={overlayRef}
        className={`${
          navigationDrawer ? 'translate-x-0' : 'translate-x-full'
        } duration-500 ease-in-out no-scrollbar fixed top-0 right-0 z-100 h-full w-full sm:w-md bg-inkblack border-l border-white/10 overflow-y-auto transition-transform flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-7 pb-5 border-b border-white/10">
          <Link
            href="/"
            onClick={closeDrawer}
            className="bg-white50Logo bg-no-repeat bg-contain bg-center w-24 h-14"
            aria-label="The Pops Orchestra — return to homepage"
          />
          <button
            onClick={closeDrawer}
            aria-label="Close navigation menu"
            className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 flex flex-col gap-y-8">
          {/* Top level links */}
          <div className="flex flex-col gap-y-1">
            {navLinks
              .filter((link) => !link.links?.length)
              .map((link, i) => (
                <Link
                  key={i}
                  onClick={closeDrawer}
                  href={link.linkKey}
                  className={`flex items-center py-3.5 px-3 text-base font-changa tracking-widest font-semibold uppercase rounded-md transition-colors duration-200 hover:bg-white/5 active:bg-white/10 ${
                    link.active ? 'text-blaze-text' : 'text-white'
                  }`}
                >
                  {link.active && <span className="w-1 h-1 rounded-full bg-blaze mr-3 shrink-0" />}
                  {link.textKey}
                </Link>
              ))}
          </div>

          <div className="w-full h-px bg-white/10" />

          {/* Links with children */}
          <div className="flex flex-col gap-y-6">
            {navLinks
              .filter((link) => link.links?.length)
              .map((link, i) => (
                <div key={i}>
                  <div
                    className={`text-[11px] font-mono tracking-[0.2em] uppercase mb-3 px-3 ${
                      link.active ? 'text-blaze-text' : 'text-white/60'
                    }`}
                  >
                    {link.textKey}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    {link.links?.map((obj, j) => (
                      <Link
                        onClick={closeDrawer}
                        key={j}
                        href={obj.linkKey}
                        className={`flex items-center py-3 px-3 text-base font-changa tracking-widest font-semibold uppercase rounded-md transition-colors duration-200 hover:bg-white/5 active:bg-white/10 ${
                          obj.active ? 'text-blaze-text' : 'text-white/70'
                        }`}
                      >
                        {obj.active && <span className="w-1 h-1 rounded-full bg-blaze mr-3 shrink-0" />}
                        {obj.textKey}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer — CTA buttons */}
        <div className="px-6 py-6 border-t border-white/10 flex flex-col gap-3">
          <Link
            href="https://ci.ovationtix.com/35505/production/1232771"
            target="_blank"
            onClick={closeDrawer}
            className="group flex items-center justify-center gap-2 bg-blaze hover:bg-blazehover active:opacity-80 text-white font-changa uppercase tracking-widest text-base py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            <span>Buy Tickets</span>
            <ExternalLink
              className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="https://ci.ovationtix.com/35505/store/donations"
            target="_blank"
            onClick={closeDrawer}
            className="group flex items-center justify-center gap-2 border border-white/30 hover:border-white active:opacity-80 text-white/70 hover:text-white font-changa uppercase tracking-widest text-base py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            <span>Make a Donation</span>
            <Heart className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </Link>
          <p className="text-white/50 text-xs font-changa uppercase tracking-widest text-center pt-2">
            The Pops Orchestra of Bradenton & Sarasota
          </p>
        </div>
      </div>
    </>
  )
}

export default NavigationDrawer
