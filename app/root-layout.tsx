'use client'

import { FC, ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { usePathname } from 'next/navigation'
import { toggleHeaderFooter } from './utils/string.functions'
import NavigationDrawer from './components/drawers/NavigationDrawer'
import Toast from './components/common/Toast'
import { Header } from './components/header/Header'
import Footer from './components/Footer'
import CampApplicationSuccessModal from './components/modals/CampApplicationSuccessModal'
import ContactSubmissionSuccessModal from './components/modals/ContactSubmissionSuccessModal'
import useScrollToTop from './lib/hooks/useScrollToTop'
import { FooterData } from './types/common.types'

export interface IRootLayoutWrapper {
  children: ReactNode
  campApplicationsSetting: boolean
  data: FooterData
}

export const RootLayoutWrapper: FC<IRootLayoutWrapper> = ({ children, campApplicationsSetting, data }) => {
  useScrollToTop()
  const pathname = usePathname()

  const showFooter = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const showHeader = useMemo(() => toggleHeaderFooter(pathname), [pathname])

  return (
    <Provider store={store}>
      <div className="main-content">
        {/* Global Components */}
        <NavigationDrawer campApplicationsSetting={campApplicationsSetting} />
        <Toast />
        <CampApplicationSuccessModal />
        <ContactSubmissionSuccessModal />

        {/* Page Layout */}
        {showHeader && <Header campApplicationsSetting={campApplicationsSetting} />}
        {children}
        {showFooter && <Footer data={data} />}
      </div>
    </Provider>
  )
}
