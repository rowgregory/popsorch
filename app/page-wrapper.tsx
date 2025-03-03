'use client'

import React, { ReactNode } from 'react'
import Footer from './components/Footer'
import { shouldIncludePath } from './utils/string.functions'
import useCustomPathname from './hooks/useCustomPathname'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import NavigationDrawer from './components/NavigationDrawer'
import SeatMapModal from './modals/SeatMapModal'

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const path = useCustomPathname()
  const showComponent = shouldIncludePath(path)

  return (
    <Provider store={store}>
      <NavigationDrawer />
      <SeatMapModal />
      {children}
      {showComponent && <Footer />}
    </Provider>
  )
}

export default PageWrapper
