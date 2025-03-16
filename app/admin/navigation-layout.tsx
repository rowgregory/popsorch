'use client'

import React, { FC, useRef } from 'react'
import Link from 'next/link'
import { ChildrenProps } from '../types/common.types'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import useCustomPathname from '../hooks/useCustomPathname'

const NavigationLayout: FC<ChildrenProps> = ({ children }) => {
  const path = useCustomPathname()
  const navRef = useRef<HTMLDivElement>(null)
  const items = adminNavigationLinkData(path, 'super-user')

  return (
    <div className="relative">
      <nav
        ref={navRef}
        className="hidden 760:flex items-center overflow-x-auto admin-navigation border-b-1 border-gray-400 border-opacity-40 relative"
      >
        <div className="flex gap-x-16">
          {items?.map((link, i) => (
            <Link
              key={i}
              href={link.linkKey}
              className={`py-2.5 flex items-center justify-center gap-x-2 whitespace-nowrap border-b-2 ${
                link.active ? 'border-b-blaze' : 'border-b-transparent'
              }`}
            >
              <span
                className={`text-xl font-rubik font-thin ${
                  link.active ? 'text-blaze' : 'text-[#6a6a6a] focus:text-white active:text-white'
                }`}
              >
                {link.textKey}
              </span>
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}

export default NavigationLayout
