'use client'

import { FC, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useAppDispatch } from './redux/store'
import { hydrateUserState } from './redux/features/userSlice'
import { setAuthState } from './redux/features/authSlice'
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
import AdminLaunchButton from './components/buttons/AdminLaunchButton'
import { IWrapper } from './types/common.types'

const PageWrapper: FC<IWrapper> = ({ children, user, textBlocks, headerButton, concerts }) => {
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

    if (user) {
      dispatch(hydrateUserState(user))
      dispatch(setAuthState(user?.isAuthenticated))
    }
  }, [user, dispatch, textBlocks, headerButton, concerts])

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

      {/* Admin Launch Button */}
      {user?.isAuthenticated && !isAdminPath && <AdminLaunchButton />}
    </div>
  )
}

export default PageWrapper
