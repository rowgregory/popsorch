import React, { useRef } from 'react'
import Link from 'next/link'
import useCustomPathname from '../hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { closeNavigationDrawer } from '../redux/features/appSlice'
import { getNavigationLinks } from '../utils/navigation.utils'
import CloseBtnSVG from './svg/CloseBtnSVG'
import CustomHeaderButton from './CustomHeaderButton'

const NavigationDrawer = () => {
  const path = useCustomPathname()
  const { navigationDrawer } = useAppSelector((state: RootState) => state.app)
  const { headerButton } = useAppSelector((state: RootState) => state.headerButton)
  const { concerts } = useAppSelector((state: RootState) => state.concert)
  const dispatch = useAppDispatch()
  const overlayRef = useRef(null)
  const navLinks = getNavigationLinks(path, concerts?.length > 0)
  const closeDrawer = () => dispatch(closeNavigationDrawer())

  return (
    <>
      <CloseBtnSVG
        onClick={closeDrawer}
        className={`${
          navigationDrawer ? 'block' : 'hidden'
        } text-white w-5 h-5 hover:text-blaze duration-300 fixed top-5 right-5 z-[101]`}
      />
      <div
        ref={overlayRef}
        className={`${
          navigationDrawer ? 'translate-y-0 ' : '-translate-x-full'
        } duration-700 no-scrollbar w-full h-full fixed bottom-0 left-0 z-[100] transition-all pb-20 bg-inkblack overflow-y-auto flex flex-col items-center`}
      >
        <div className="mb-10 px-8 py-16 flex flex-col gap-y-5">
          <CustomHeaderButton {...headerButton} />
          {navLinks.map((link, i) => (
            <div key={i} className="group">
              {link.linkKey ? (
                <Link
                  onClick={closeDrawer}
                  href={link.linkKey}
                  key={i}
                  className={`text-lg font-changa tracking-widest font-semibold duration-300 hover:text-blaze uppercase ${
                    link.active ? 'text-blaze' : 'text-white'
                  }`}
                >
                  {link.textKey}
                </Link>
              ) : (
                <div key={i}>
                  <div
                    className={`text-lg font-changa tracking-widest font-semibold duration-300 uppercase ${
                      link.active ? 'text-blaze' : 'text-white'
                    }`}
                  >
                    {link.textKey}
                  </div>
                  <div className="flex flex-col gap-y-3 mt-3 w-full">
                    {link.links?.map((obj, i) => (
                      <Link
                        onClick={closeDrawer}
                        key={i}
                        href={obj.linkKey}
                        className={`ml-4 whitespace-nowrap text-lg font-changa tracking-widest font-semibold duration-300 hover:text-blaze uppercase ${
                          obj.active ? 'text-blaze' : 'text-white'
                        }`}
                      >
                        - {obj.textKey}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>{' '}
    </>
  )
}

export default NavigationDrawer
