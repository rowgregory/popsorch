'use client'

import React, { FC, useState } from 'react'
import { ChildrenProps } from '@/app/types/common.types'
import useCustomPathname from '../hooks/useCustomPathname'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import { RootState, useAppSelector } from '../redux/store'
import AdminNavigationDrawer from '../drawers/AdminNavigationDrawer'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import { motion } from 'framer-motion'
import FixedHeader from '../components/admin/FixedHeader'
import ConcertDrawer from '../drawers/ConcertDrawer'
import CampApplicationViewDrawer from '../drawers/CampApplicationViewDrawer'
import SponsorDrawer from '../drawers/SponsorDrawer'
import TeamMemberDrawer from '../drawers/TeamMemberDrawer'
import VenueDrawer from '../drawers/VenueDrawer'
import getCurrentPageId from '../lib/utils/getCurrentPageId'
import { useFetchSubscribersQuery } from '../redux/services/mailchimpApi'

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  useFetchSubscribersQuery(undefined)
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const path = useCustomPathname()
  const { user } = useAppSelector((state: RootState) => state.user)
  const items = adminNavigationLinkData(path, user?.role)
  const selectedPage = getCurrentPageId(path, items)

  return (
    <>
      <AdminNavigationDrawer />
      <ConcertDrawer />
      <CampApplicationViewDrawer />
      <SponsorDrawer />
      <TeamMemberDrawer />
      <VenueDrawer />
      <div className="min-h-screen bg-neutral-950 flex">
        {/* Fixed Left Navigation Panel */}
        <FixedLeftNavigationPanel
          isNavigationCollapsed={isNavigationCollapsed}
          setIsNavigationCollapsed={setIsNavigationCollapsed}
          links={items}
          data={user}
        />

        {/* Main Content Area */}
        <div
          className={`${isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'} flex-1 flex flex-col`}
          style={{ transition: 'margin-left 0.3s ease-in-out' }}
        >
          {/* Fixed Header */}
          <FixedHeader isNavigationCollapsed={isNavigationCollapsed} selectedPage={selectedPage} links={items} />

          {/* Content Area */}
          <main className="flex-1 pt-16 overflow-hidden">
            <motion.div
              key={selectedPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-y-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  )
}

export default AdminLayout
