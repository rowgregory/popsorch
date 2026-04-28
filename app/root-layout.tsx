'use client'

import { FC, ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { usePathname } from 'next/navigation'
import { toggleHeaderFooter } from './utils/string.functions'
import NavigationDrawer from './components/drawers/NavigationDrawer'
import Toast from './components/common/Toast'
import { Header } from './components/header/Header'
import Footer from './components/Footer'
import CampApplicationSuccessModal from './components/modals/CampApplicationSuccessModal'
import ContactSubmissionSuccessModal from './components/modals/ContactSubmissionSuccessModal'
import { Concert } from '@prisma/client'
import useScrollToTop from './lib/hooks/useScrollToTop'
import { FooterData } from './types/common.types'

export interface IRootLayoutWrapper {
  children: ReactNode
  concerts: Concert[]
  campApplicationsSetting: boolean
  data: FooterData
}

export const RootLayoutWrapper: FC<IRootLayoutWrapper> = ({ children, concerts, campApplicationsSetting, data }) => {
  useScrollToTop()
  const pathname = usePathname()

  const showFooter = useMemo(() => toggleHeaderFooter(pathname), [pathname])
  const showHeader = useMemo(() => toggleHeaderFooter(pathname), [pathname])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="main-content">
          {/* Global Components */}
          <NavigationDrawer concerts={concerts} campApplicationsSetting={campApplicationsSetting} />
          <Toast />
          <CampApplicationSuccessModal />
          <ContactSubmissionSuccessModal />

          {/* Page Layout */}
          {showHeader && <Header concerts={concerts} campApplicationsSetting={campApplicationsSetting} />}
          {children}
          {showFooter && <Footer data={data} />}
        </div>
      </PersistGate>
    </Provider>
  )
}
