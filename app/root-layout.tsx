'use client'

import { FC, ReactNode, useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { usePathname } from 'next/navigation'
import { toggleHeaderFooter } from './utils/string.functions'
import useNetworkStatus from './hooks/useNetworkStatus'
import useScrollToTop from './hooks/useScrollToTop'
import { hydrateHeaderButton } from './redux/features/headerButtonSlice'
import { setTextBlocks } from './redux/features/textBlockSlice'
import NavigationDrawer from './components/NavigationDrawer'
import HeaderFixed from './components/header/HeaderFixed'
import AccessibilityDrawer from './components/drawers/AccessibilityDrawer'
import Toast from './components/common/Toast'
import { Header } from './components/header/Header'
import Footer from './components/Footer'
import AccessibilityButton from './components/buttons/AccessibilityButton'
import CampApplicationSuccessModal from './components/modals/CampApplicationSuccessModal'
import ContactSubmissionSuccessModal from './components/modals/ContactSubmissionSuccessModal'

export interface IWrapper {
  children: ReactNode
  textBlocks: any
  headerButton: any
  concerts: any
  campApplicationsSetting: any
  footer: any
}

export const RootLayoutWrapper: FC<IWrapper> = ({
  children,
  textBlocks,
  headerButton,
  concerts,
  campApplicationsSetting,
  footer
}) => {
  const pathname = usePathname()

  const showFooter = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const showHeader = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const isAdminPath = pathname.includes('/admin')

  useNetworkStatus()
  useScrollToTop()

  useEffect(() => {
    if (headerButton) {
      store.dispatch(hydrateHeaderButton(headerButton))
    }

    if (textBlocks) {
      store.dispatch(setTextBlocks(textBlocks))
    }
  }, [headerButton, textBlocks])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="main-content">
          {/* Global Components */}
          <NavigationDrawer concerts={concerts} campApplicationsSetting={campApplicationsSetting} />
          <HeaderFixed concerts={concerts} campApplicationsSetting={campApplicationsSetting} />
          <AccessibilityDrawer />
          <Toast />
          <CampApplicationSuccessModal />
          <ContactSubmissionSuccessModal />

          {/* Page Layout */}
          {showHeader && <Header concerts={concerts} campApplicationsSetting={campApplicationsSetting} />}
          {children}
          {showFooter && <Footer data={footer} />}

          {/* Accessibility Button */}
          {!isAdminPath && <AccessibilityButton />}
        </div>
      </PersistGate>
    </Provider>
  )
}
