'use client'

import { FC, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useAppDispatch } from './redux/store'
import useNetworkStatus from './hooks/useNetworkStatus'
import useScrollToTop from './hooks/useScrollToTop'
import NavigationDrawer from './components/NavigationDrawer'
import HeaderFixed from './components/header/HeaderFixed'
import AccessibilityDrawer from './components/drawers/AccessibilityDrawer'
import Toast from './components/common/Toast'
import Header from './components/header/Header'
import Footer from './components/Footer'
import { setTextBlocks } from './redux/features/textBlockSlice'
import { hydrateHeaderButton } from './redux/features/headerButtonSlice'
import { toggleHeaderFooter } from './utils/string.functions'
import AccessibilityButton from './components/buttons/AccessibilityButton'
import { IWrapper } from './types/common.types'

const PageWrapper: FC<IWrapper> = ({ children, textBlocks, headerButton, concerts }) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()

  const showFooter = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const showHeader = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const isAdminPath = pathname.includes('/admin')

  useNetworkStatus()
  useScrollToTop()

  useEffect(() => {
    if (headerButton) {
      dispatch(hydrateHeaderButton(headerButton))
    }

    if (textBlocks) {
      dispatch(setTextBlocks(textBlocks))
    }
  }, [dispatch, textBlocks, headerButton, concerts])

  return (
    <div className="main-content">
      {/* Global Components */}
      <NavigationDrawer />
      <HeaderFixed />
      <AccessibilityDrawer />
      <Toast />

      {/* Page Layout */}
      {showHeader && <Header concerts={concerts} />}
      {children}
      {showFooter && <Footer />}

      {/* Accessibility Button */}
      {!isAdminPath && <AccessibilityButton />}
    </div>
  )
}

export default PageWrapper
