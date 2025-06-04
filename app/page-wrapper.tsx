'use client'

import React, { FC, useEffect, useState } from 'react'
import { shouldShowFooter, shouldShowHeader } from './utils/string.functions'
import useCustomPathname from './hooks/useCustomPathname'
import { Provider } from 'react-redux'
import { RootState, store, useAppDispatch, useAppSelector } from './redux/store'
import NavigationDrawer from './components/NavigationDrawer'
import Header from './components/header/Header'
import PublicEditableTextAreaModal from './modals/PublicEditableTextAreaModal'
import { useFetchAppDataQuery } from './redux/services/appApi'
import { ClientPageProps } from './types/common.types'
import { setUser } from './redux/features/userSlice'
import PublicImageUploaderModal from './modals/PublicImageUploaderModal'
import { setAuthState } from './redux/features/authSlice'
import Footer from './components/Footer'
import useScrollToTop from './hooks/useScrollToTop'
import HeaderFixed from './components/header/HeaderFixed'
import useNetworkStatus from './hooks/useNetworkStatus'
import AccessibilityDrawer from './drawers/AccessibilityDrawer'
import AwesomeIcon from './components/common/AwesomeIcon'
import { checkCircleIcon, universalAccessIcon } from './lib/icons'
import { setToggleAccessibilityDrawer } from './redux/features/appSlice'
import { useIncreaseAppCountMutation } from './redux/services/metricApi'
import Hotjar from '@hotjar/browser'

const siteId = 6425784
const hotjarVersion = 6

const PageWrapper: FC<ClientPageProps> = ({ children, data }) => {
  useFetchAppDataQuery({})
  useNetworkStatus()
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const showFooter = shouldShowFooter(path)
  const showHeader = shouldShowHeader(path)
  const { openModal, accessibility } = useAppSelector((state: RootState) => state.app)
  const [showCheckmark, setShowCheckmark] = useState(false)
  useScrollToTop()
  const [increaseAppCount] = useIncreaseAppCountMutation()

  useEffect(() => {
    if (data) {
      dispatch(setUser({ id: data.id }))
      dispatch(setAuthState({ isAuthenticated: data.isAuthenticated, userId: data.id }))
    }
  }, [data, dispatch])

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion)
  }, [])

  useEffect(() => {
    const asyncIncraseAppCount = async () => {
      try {
        await increaseAppCount({}).unwrap()
      } catch {}
    }

    asyncIncraseAppCount()
  }, [increaseAppCount])

  useEffect(() => {
    const highContrast = localStorage.getItem('highContrast') === 'true'
    const highlightLinks = localStorage.getItem('highlightLinks') === 'true'
    const stepIndex = parseInt(localStorage.getItem('stepIndex') || '0', 10)
    const textSpacing = localStorage.getItem('textSpacing') === 'true'
    const dyslexiaFriendly = localStorage.getItem('dyslexiaFriendly') === 'true'
    const lineHeight = localStorage.getItem('lineHeight') === 'true'

    if (highContrast || highlightLinks || stepIndex > 0 || textSpacing || dyslexiaFriendly || lineHeight) {
      setShowCheckmark(true)
    } else {
      setShowCheckmark(false)
    }
  }, [accessibility])

  return (
    <Provider store={store}>
      <div className="main-content">
        <NavigationDrawer />
        <PublicImageUploaderModal />
        <HeaderFixed />
        {openModal && <PublicEditableTextAreaModal />}
        {showHeader && <Header />}
        {children}
        {showFooter && <Footer />}
      </div>

      <AccessibilityDrawer />
      <div className="relative">
        <AwesomeIcon
          icon={universalAccessIcon}
          className="p-2 bg-indigo-600 text-white rounded-full w-8 h-8 fixed z-[110] bottom-5 left-5 cursor-pointer hover:animate-rotateToTwoOClock"
          onClick={() => dispatch(setToggleAccessibilityDrawer(accessibility))}
        />
        {showCheckmark && (
          <AwesomeIcon icon={checkCircleIcon} className="w-5 h-5 text-lime-500 fixed bottom-12 left-14 z-[120]" />
        )}
      </div>
    </Provider>
  )
}

export default PageWrapper
