'use client'

import { FC, ReactNode, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useDashboardSelector, useUserSelector } from '@/app/redux/store'
import AdminSidebar from '@/app/admin/sidebar'
import ConcertDrawer from '@/app/components/drawers/ConcertDrawer'
import CampApplicationViewDrawer from '@/app/components/drawers/CampApplicationViewDrawer'
import SponsorDrawer from '@/app/components/drawers/SponsorDrawer'
import TeamMemberDrawer from '@/app/components/drawers/TeamMemberDrawer'
import VenueDrawer from '@/app/components/drawers/VenueDrawer'
import ConductorModal from '@/app/components/modals/ConductorModal'
import { setCloseAdminSidebar, setToggleAdminSidebar } from '@/app/redux/features/dashboardSlice'
import { setUser } from '@/app/redux/features/userSlice'
import { Menu } from 'lucide-react'
import MobileMenuButton from '../header/MobileMenuButton'
import ActionButtonWithDropdown from '../admin/ActionButtonWithDropdown'
import LogoutButton from '../header/LogoutButton'
import getCurrentPageId from '../../lib/utils/getCurrentPageId'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import PageSelectorModal from '../modals/PageSelectorModal'
import HeaderButtonStudioDrawer from '../drawers/HeaderButtonStudioDrawer'
import { usePathname } from 'next/navigation'

interface IAdminClientLayout {
  children: ReactNode
  data: any
  buttons: any
}

const AdminClientLayout: FC<IAdminClientLayout> = ({ children, data, buttons }) => {
  const pathname = usePathname()
  const { user } = useUserSelector()
  const navigationGroups = adminNavigationLinkData(pathname, user?.role)
  const selectedPage = getCurrentPageId(pathname, navigationGroups)
  const dispatch = useAppDispatch()
  const { adminSidebar } = useDashboardSelector()
  const onClose = () => dispatch(setCloseAdminSidebar())

  useEffect(() => {
    dispatch(setUser(data))
  }, [data, dispatch])

  return (
    <>
      {/* Drawers & Modals */}
      <ConcertDrawer />
      <CampApplicationViewDrawer />
      <SponsorDrawer />
      <TeamMemberDrawer />
      <VenueDrawer />
      <ConductorModal />
      <HeaderButtonStudioDrawer data={buttons} />
      <PageSelectorModal />

      {/* Desktop Fixed Header */}
      <header className="hidden lg:block fixed top-0 left-64 right-0 bg-neutral-950 border-b border-neutral-800 py-4 px-6 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-neutral-100 capitalize">{selectedPage}</h1>
          <div className="flex items-center space-x-2 md:space-x-4 h-full">
            <MobileMenuButton />
            <ActionButtonWithDropdown />
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-neutral-950 flex">
        {/* Mobile Sidebar Overlay */}
        {adminSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-20">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <motion.div
          initial={false}
          animate={{ x: adminSidebar ? 0 : '-100%' }}
          transition={{ duration: 0.3 }}
          className="fixed lg:hidden inset-y-0 left-0 z-50 w-64"
        >
          <AdminSidebar />
        </motion.div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col lg:ml-64 lg:mt-15">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between bg-neutral-900 border-b border-neutral-800 px-4 py-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(setToggleAdminSidebar(adminSidebar))}
              className="p-2 hover:bg-neutral-950 rounded-lg"
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.button>
            <h1 className="text-lg font-bold text-white capitalize">{selectedPage}</h1>
            <div className="w-10" />
          </div>

          {/* Content */}
          {children}
        </main>
      </div>
    </>
  )
}

export default AdminClientLayout
