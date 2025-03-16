'use client'

import React, { ReactNode } from 'react'
import Footer from './components/Footer'
import { shouldShowFooter, shouldShowHeader } from './utils/string.functions'
import useCustomPathname from './hooks/useCustomPathname'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import NavigationDrawer from './components/NavigationDrawer'
import SeatMapModal from './modals/SeatMapModal'
import Header from './components/header/Header'

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const path = useCustomPathname()
  const showFooter = shouldShowFooter(path)
  const showHeader = shouldShowHeader(path)

  return (
    <Provider store={store}>
      <NavigationDrawer />
      <SeatMapModal />
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}
    </Provider>
  )
}

export default PageWrapper
