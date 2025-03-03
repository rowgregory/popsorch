import React, { useRef } from 'react'
import Link from 'next/link'
import useCustomPathname from '../hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeNavigationDrawer } from '../redux/features/appSlice'
import LogoSVG from './svg/LogoSVG'
import { getNavigationLinks } from '../utils/navigation.utils'
import CloseBtnSVG from './svg/CloseBtnSVG'
import Picture from './common/Picture'

const NavigationDrawer = () => {
  const path = useCustomPathname()
  const { navigationDrawer } = useAppSelector((state: RootState) => state.app)
  const dispatch = useAppDispatch()
  const overlayRef = useRef(null)
  const navLinks = getNavigationLinks(path)
  const closeDrawer = () => dispatch(closeNavigationDrawer())

  return (
    <div
      ref={overlayRef}
      className={`${
        navigationDrawer ? 'translate-y-0 ' : '-translate-y-full'
      } duration-200 no-scrollbar overflow-x-hidden overflow-y-auto w-full h-full fixed top-0 bottom-0 right-0 z-[60] transition-all bg-white dark:bg-[#13121D] pb-20`}
    >
      <div className="px-4 md:px-12 py-6 flex items-center justify-between w-full">
        <Link href="/" className="flex items-end" onClick={closeDrawer}>
          <Picture src="/images/robyn.png" className="w-auto h-[85px] md:h-[135px]" priority={true} />
          <LogoSVG className="mb-1 text-black dark:text-white" />
        </Link>
        <CloseBtnSVG onClick={closeDrawer} className="hover:text-blaze duration-300" />
      </div>
      <div className="430:max-w-lg 430:mx-auto w-full">
        <div className="flex flex-col mb-10 w-fit">
          {navLinks.map((link, i) => (
            <div onClick={closeDrawer} key={i} className="grid grid-cols-12 items-center gap-x-4 group px-6 py-3">
              <Link
                href={link.linkKey}
                key={i}
                className={`col-span-11 text-4xl font-bold duration-300 hover:text-blaze uppercase ${
                  link.active ? 'text-blaze' : 'text-gunmetal dark:text-gray-400'
                } group-hover:translate-x-3`}
              >
                {link.textKey}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavigationDrawer
