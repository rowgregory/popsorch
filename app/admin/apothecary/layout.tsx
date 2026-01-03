'use client'

import useCustomPathname from '@/app/hooks/useCustomPathname'
import useSoundEffect from '@/app/hooks/useSoundEffect'
import { useUserSelector } from '@/app/redux/store'
import { ChildrenProps } from '@/app/types/common.types'
import Link from 'next/link'
import { FC } from 'react'

const ApothecaryLayout: FC<ChildrenProps> = ({ children }) => {
  const { user } = useUserSelector()
  const path = useCustomPathname()
  const { play } = useSoundEffect('/mp3/material-chest-open.mp3', user?.isSoundEffectsOn)

  const handleNav = () => {
    play()
  }

  return (
    <>
      {/* Navigation */}
      <div className="fixed top-[68px] w-full z-10 bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-700/30">
        <div className="px-2 xs:px-3 sm:px-6">
          <nav className="flex items-center py-2 xs:py-3 sm:py-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-6 lg:space-x-8 min-w-max">
              {[
                { textKey: 'Codex', linkKey: '/admin/apothecary/codex', isActive: path === '/admin/apothecary/codex' },
                { textKey: 'Sell', linkKey: '/admin/apothecary/sell', isActive: path === '/admin/apothecary/sell' },
                {
                  textKey: 'Reports',
                  linkKey: '/admin/apothecary/reports',
                  isActive: path === '/admin/apothecary/reports'
                },
                {
                  textKey: 'Events',
                  linkKey: '/admin/apothecary/events',
                  isActive: path === '/admin/apothecary/events'
                },
                { textKey: 'Print', linkKey: '/admin/apothecary/print', isActive: path === '/admin/apothecary/print' },
                {
                  textKey: 'Search',
                  linkKey: '/admin/apothecary/search',
                  isActive: path === '/admin/apothecary/search'
                },
                { textKey: 'Tools', linkKey: '/admin/apothecary/tools', isActive: path === '/admin/apothecary/tools' }
              ].map((item) => (
                <Link
                  onClick={handleNav}
                  href={item.linkKey}
                  key={item.textKey}
                  className={`text-[10px] xs:text-xs sm:text-sm font-medium transition-all duration-200 relative group whitespace-nowrap px-1.5 xs:px-2 py-1 rounded touch-manipulation flex-shrink-0 ${
                    item.isActive
                      ? 'text-white bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/30'
                  }`}
                >
                  {item.textKey}

                  <div
                    className={`absolute -bottom-3 sm:-bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 transition-transform hidden sm:block ${
                      item.isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  ></div>

                  {item.isActive && (
                    <div className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full sm:hidden"></div>
                  )}
                </Link>
              ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-4 xs:w-6 sm:w-8 bg-gradient-to-l from-neutral-900/50 to-transparent pointer-events-none sm:hidden"></div>
          </nav>
        </div>
      </div>
      {children}
    </>
  )
}

export default ApothecaryLayout
