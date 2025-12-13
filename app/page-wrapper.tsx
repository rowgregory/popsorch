'use client'

import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Provider } from 'react-redux'
import Link from 'next/link'
import { RootState, store, useAppDispatch, useAppSelector } from './redux/store'
import { hydrateUserState } from './redux/features/userSlice'
import { setAuthState } from './redux/features/authSlice'
import { hydrateAppState, setToggleAccessibilityDrawer } from './redux/features/appSlice'
import useNetworkStatus from './hooks/useNetworkStatus'
import useScrollToTop from './hooks/useScrollToTop'
import NavigationDrawer from './components/NavigationDrawer'
import PublicImageUploaderModal from './modals/PublicImageUploaderModal'
import HeaderFixed from './components/header/HeaderFixed'
import AccessibilityDrawer from './drawers/AccessibilityDrawer'
import InconspicuousSignInDrawer from './drawers/InconspicousSignInDrawer'
import Toast from './components/common/Toast'
import PublicEditableTextAreaModal from './modals/PublicEditableTextAreaModal'
import Header from './components/header/Header'
import Footer from './components/Footer'
import { Accessibility, CheckCircle } from 'lucide-react'
import { setTextBlocks } from './redux/features/textBlockSlice'
import { setConcerts } from './redux/features/concertSlice'
import { setVenues } from './redux/features/venueSlice'
import { setPhotoGalleryImages } from './redux/features/photoGalleryImageSlice'
import { setBoardMembers, setMusicians, setStaff, setTeamMembers } from './redux/features/teamMemberSlice'
import { hydrateHeaderButton } from './redux/features/headerButtonSlice'
import { shouldShowFooter, shouldShowHeader } from './utils/string.functions'

interface PageWrapperProps {
  children: ReactNode
  userId: string | null
  appData: any // Type this properly based on your data structure
}

const PageWrapperContent: FC<PageWrapperProps> = ({ children, userId, appData }) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const {
    openModal,
    accessibility,
    highContrast,
    highlightLinks,
    stepIndex,
    textSpacing,
    dyslexiaFriendly,
    lineHeight
  } = useAppSelector((state) => state.app)
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const showFooter = useMemo(() => shouldShowFooter(pathname), [pathname])
  const showHeader = useMemo(() => shouldShowHeader(pathname), [pathname])
  const isAdminPath = pathname.includes('/admin')

  useNetworkStatus()
  useScrollToTop()

  // Hydrate Redux with server-fetched data on mount
  useEffect(() => {
    if (appData) {
      dispatch(hydrateUserState(appData.user))
      dispatch(setTextBlocks(appData.textBlocks))
      dispatch(setConcerts(appData.concerts))
      dispatch(setVenues(appData.venues))
      dispatch(setPhotoGalleryImages(appData.photoGalleryImages))
      dispatch(setTeamMembers(appData.teamMembers))
      dispatch(setStaff(appData.staff))
      dispatch(setBoardMembers(appData.boardMembers))
      dispatch(setMusicians(appData.musicians))
      dispatch(
        hydrateAppState({
          isSeasonPackageBannerToggledLive: appData.isSeasonPackageBannerToggledLive,
          isSeasonPackageBannerToggledVisible: appData.isSeasonPackageBannerToggledVisible,
          isFeatureToggleCardLive: appData.isFeatureToggleCardLive,
          isFeatureToggleCardVisible: appData.isFeatureToggleCardVisible
        })
      )
      dispatch(hydrateHeaderButton(appData.headerButton))
    }

    if (userId) {
      dispatch(
        setAuthState({
          isAuthenticated: appData.isAuthenticated,
          userId,
          isAdmin: appData?.user.isAdmin || false,
          isSuperUser: appData?.user.isSuperUser || false
        })
      )
    }
  }, [appData, userId, dispatch])

  // Show checkmark if any accessibility features are enabled
  useEffect(() => {
    const hasFeature = highContrast || highlightLinks || stepIndex > 0 || textSpacing || dyslexiaFriendly || lineHeight
    setShowCheckmark(hasFeature)
  }, [highContrast, highlightLinks, stepIndex, textSpacing, dyslexiaFriendly, lineHeight])

  const handleAccessibilityToggle = useCallback(() => {
    dispatch(setToggleAccessibilityDrawer(accessibility))
  }, [dispatch, accessibility])

  return (
    <div className="main-content">
      {/* Global Components */}
      <NavigationDrawer />
      <PublicImageUploaderModal />
      <HeaderFixed />
      <AccessibilityDrawer />
      <InconspicuousSignInDrawer />
      <Toast />

      {/* Conditional Modals */}
      {openModal && <PublicEditableTextAreaModal />}

      {/* Page Layout */}
      {showHeader && <Header />}
      {children}
      {showFooter && <Footer />}

      {/* Accessibility Button */}
      {!isAdminPath && (
        <div className="fixed bottom-5 left-5 z-110">
          <button
            onClick={handleAccessibilityToggle}
            className="relative p-2 bg-indigo-600 text-white rounded-full w-12 h-12 hover:bg-indigo-700 hover:scale-110 transition-all shadow-lg"
            aria-label="Toggle accessibility options"
          >
            <Accessibility className="w-8 h-8" />
            {showCheckmark && <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-lime-500 drop-shadow-lg" />}
          </button>
        </div>
      )}

      {/* Admin Launch Button */}
      {isAuthenticated && !isAdminPath && (
        <Link
          href="/admin/dashboard"
          className="fixed bottom-5 right-5 z-50 px-6 py-3 rounded-full text-white bg-neutral-900 border-2 border-indigo-600 hover:bg-indigo-600 transition-all shadow-lg font-semibold"
        >
          Launch App
        </Link>
      )}
    </div>
  )
}

const PageWrapper: FC<PageWrapperProps> = ({ children, userId, appData }) => {
  return (
    <Provider store={store}>
      <PageWrapperContent userId={userId} appData={appData}>
        {children}
      </PageWrapperContent>
    </Provider>
  )
}

export default PageWrapper
