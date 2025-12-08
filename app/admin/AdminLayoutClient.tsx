'use client'

import React, { FC, ReactNode, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAppDispatch } from '../redux/store'
import AdminNavigationDrawer from '../drawers/AdminNavigationDrawer'
import FixedLeftNavigationPanel from '../components/admin/FixedLeftNavigationPanel'
import FixedHeader from '../components/admin/FixedHeader'
import ConcertDrawer from '../drawers/ConcertDrawer'
import CampApplicationViewDrawer from '../drawers/CampApplicationViewDrawer'
import SponsorDrawer from '../drawers/SponsorDrawer'
import TeamMemberDrawer from '../drawers/TeamMemberDrawer'
import VenueDrawer from '../drawers/VenueDrawer'
import ConductorModal from '../modals/ConductorModal'
import getCurrentPageId from '../lib/utils/getCurrentPageId'
import { setDashboardData } from '../redux/features/dashboardSlice'
import { setSponsors } from '../redux/features/sponsorSlice'
import { setCampApplications } from '../redux/features/campSlice'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import { setUsers } from '../redux/features/userSlice'
import { setMailchimpMembers } from '../redux/features/mailchimpSlice'
import { setQuestions } from '../redux/features/questionSlice'
import HeaderButtonStudio from '../drawers/HeaderButtonStudio'
import { setLogs } from '../redux/features/logSlice'

interface DashboardData {
  user: {
    id: string
    email: string
    role: string
    isAdmin: boolean
    isSuperUser: boolean
  }
  users: any[]
  usersCount: number
  campApplicationCount: number
  questionCount: number
  concertsCount: number
  teamMembersCount: number
  questionsCount: number
  photoGalleryImagesCount: number
  sponsorCount: number
  venuesCount: number
  headerButtonCount: number
  lastModifiedHeaderButton: Date | null
  mailchimpMembers: any
  sponsors: any
  campApplications: any
  questions: any
  logs: any
}

interface AdminClientLayoutProps {
  children: ReactNode
  dashboardData: DashboardData
}

const AdminClientLayout: FC<AdminClientLayoutProps> = ({ children, dashboardData }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const pathname = usePathname()
  const navigationLinks = adminNavigationLinkData(pathname, dashboardData.user.role)
  const selectedPage = getCurrentPageId(pathname, navigationLinks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setDashboardData(dashboardData))
    dispatch(setSponsors(dashboardData.sponsors))
    dispatch(setCampApplications(dashboardData.campApplications))
    dispatch(setUsers(dashboardData.users))
    dispatch(setMailchimpMembers(dashboardData))
    dispatch(setQuestions(dashboardData.questions))
    dispatch(setLogs(dashboardData.logs))
  }, [dashboardData, dispatch])

  return (
    <>
      {/* Drawers & Modals */}
      <AdminNavigationDrawer />
      <ConcertDrawer />
      <CampApplicationViewDrawer />
      <SponsorDrawer />
      <TeamMemberDrawer />
      <VenueDrawer />
      <ConductorModal />
      <HeaderButtonStudio />

      <div className="min-h-screen bg-neutral-950 flex">
        {/* Fixed Left Navigation Panel */}
        <FixedLeftNavigationPanel
          isNavigationCollapsed={isNavigationCollapsed}
          setIsNavigationCollapsed={setIsNavigationCollapsed}
          links={navigationLinks}
          data={dashboardData.user}
        />

        {/* Main Content Area */}
        <div
          className={`${
            isNavigationCollapsed ? 'lg:ml-20' : 'lg:ml-[280px]'
          } flex-1 flex flex-col transition-all duration-300`}
        >
          {/* Fixed Header */}
          <FixedHeader
            isNavigationCollapsed={isNavigationCollapsed}
            selectedPage={selectedPage}
            links={navigationLinks}
            dashboardData={dashboardData}
          />

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

export default AdminClientLayout
