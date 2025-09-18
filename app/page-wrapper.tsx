'use client'

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { shouldShowFooter, shouldShowHeader } from './utils/string.functions'
import useCustomPathname from './hooks/useCustomPathname'
import { Provider } from 'react-redux'
import { RootState, store, useAppDispatch, useAppSelector } from './redux/store'
import NavigationDrawer from './components/NavigationDrawer'
import Header from './components/header/Header'
import PublicEditableTextAreaModal from './modals/PublicEditableTextAreaModal'
import { useFetchAppDataQuery } from './redux/services/appApi'
import { ClientPageProps } from './types/common.types'
import { hydrateUserState } from './redux/features/userSlice'
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
import { useCreateDailyMetricMutation } from './redux/services/metricApi'
import InconspicousSignInDrawer from './drawers/InconspicousSignInDrawer'
import Link from 'next/link'

const PageWrapper: FC<ClientPageProps> = ({ children, data }) => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const { openModal, accessibility } = useAppSelector((state: RootState) => state.app)
  const auth = useAppSelector((state: RootState) => state.auth)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [createDailyMetric] = useCreateDailyMetricMutation()

  // **OPTIMIZATION 1: Memoize expensive calculations**
  const showFooter = useMemo(() => shouldShowFooter(path), [path])
  const showHeader = useMemo(() => shouldShowHeader(path), [path])

  // **OPTIMIZATION 2: Move hooks to avoid unnecessary re-renders**
  useFetchAppDataQuery(
    {},
    {
      // Add options to reduce unnecessary refetches
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      refetchOnReconnect: true
    }
  )
  useNetworkStatus()
  useScrollToTop()

  // **OPTIMIZATION 3: Memoize user data effect**
  const memoizedUserData = useMemo(() => data, [data])

  useEffect(() => {
    if (memoizedUserData) {
      dispatch(hydrateUserState(data))
      dispatch(
        setAuthState({
          isAuthenticated: memoizedUserData.isAuthenticated,
          userId: memoizedUserData.id
        })
      )
    }
  }, [memoizedUserData, dispatch, data])

  // **OPTIMIZATION 5: Debounce daily metric creation and add session storage check**
  useEffect(() => {
    const createMetricOnce = async () => {
      try {
        // Check if already tracked this session
        const sessionKey = `dailyMetric_${new Date().toISOString().split('T')[0]}`
        if (sessionStorage.getItem(sessionKey)) {
          return // Already tracked today in this session
        }

        const isMobile =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
          window.innerWidth <= 768

        const currentDate = new Date().toISOString().split('T')[0]

        await createDailyMetric({ isMobile, currentDate }).unwrap()

        // Mark as tracked for this session
        sessionStorage.setItem(sessionKey, 'true')
      } catch {}
    }

    // Debounce to avoid multiple rapid calls
    const timeoutId = setTimeout(createMetricOnce, 1000)
    return () => clearTimeout(timeoutId)
  }, [createDailyMetric])

  // **OPTIMIZATION 6: Memoize accessibility settings check**
  const accessibilitySettings = useMemo(() => {
    if (typeof window === 'undefined') return null

    return {
      highContrast: localStorage.getItem('highContrast') === 'true',
      highlightLinks: localStorage.getItem('highlightLinks') === 'true',
      stepIndex: parseInt(localStorage.getItem('stepIndex') || '0', 10),
      textSpacing: localStorage.getItem('textSpacing') === 'true',
      dyslexiaFriendly: localStorage.getItem('dyslexiaFriendly') === 'true',
      lineHeight: localStorage.getItem('lineHeight') === 'true'
    }
  }, [])

  useEffect(() => {
    if (!accessibilitySettings) return

    const hasAnyAccessibilityFeature =
      accessibilitySettings.highContrast ||
      accessibilitySettings.highlightLinks ||
      accessibilitySettings.stepIndex > 0 ||
      accessibilitySettings.textSpacing ||
      accessibilitySettings.dyslexiaFriendly ||
      accessibilitySettings.lineHeight

    setShowCheckmark(hasAnyAccessibilityFeature)
  }, [accessibilitySettings])

  // **OPTIMIZATION 7: Memoize accessibility button handler**
  const handleAccessibilityToggle = useCallback(() => {
    dispatch(setToggleAccessibilityDrawer(accessibility))
  }, [dispatch, accessibility])

  // **OPTIMIZATION 8: Memoize static components**
  const StaticComponents = useMemo(
    () => (
      <>
        <NavigationDrawer />
        <PublicImageUploaderModal />
        <HeaderFixed />
        <AccessibilityDrawer />
      </>
    ),
    []
  )

  console.log('auth: ', auth)

  return (
    <Provider store={store}>
      <div className="main-content">
        <InconspicousSignInDrawer />
        {StaticComponents}
        {openModal && <PublicEditableTextAreaModal />}
        {showHeader && <Header />}
        {children}
        {showFooter && <Footer />}
      </div>

      <div className="relative">
        <AwesomeIcon
          icon={universalAccessIcon}
          className="p-2 bg-indigo-600 text-white rounded-full w-8 h-8 fixed z-[110] bottom-5 left-5 cursor-pointer hover:animate-rotateToTwoOClock"
          onClick={handleAccessibilityToggle}
        />
        {showCheckmark && (
          <AwesomeIcon icon={checkCircleIcon} className="w-5 h-5 text-lime-500 fixed bottom-12 left-14 z-[120]" />
        )}
      </div>
      {data?.isAuthenticated && !path.includes('/admin') && (
        <Link
          href="/admin/dashboard"
          className="px-6 py-2 rounded-full text-white fixed bottom-2 right-2 z-50 border-2 border-blaze bg-neutral-900 duration-300 hover:bg-blaze"
        >
          Launch App
        </Link>
      )}
    </Provider>
  )
}

export default PageWrapper
