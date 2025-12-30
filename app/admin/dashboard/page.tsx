'use client'

import DashboardStatsGrid from '@/app/components/admin/dashboard/DashboardStatsGrid'
import ApothecaryCard from '@/app/components/admin/dashboard/ApothecaryCard'
import WinterCard from '@/app/components/admin/dashboard/WinterCard'
import MusicianSlots from '@/app/components/admin/dashboard/MusicianSlots'
import QuickActions from '@/app/components/admin/dashboard/QuickActions'

import HeaderButtonStudioCard from '@/app/components/admin/dashboard/HeaderButtonStudioCard'
import CampApplicationsToggleCard from '@/app/components/admin/dashboard/CampApplicationsToggleCard'
import SeasonBannerToggleCard from '@/app/components/admin/dashboard/SeasonBannerToggleCard'
import FBPixelComingSoon from '@/app/components/admin/dashboard/FBPixelComingSoon'

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-neutral-950 via-black to-neutral-950">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">
        {/* Main Content Area */}
        <div className="flex-1 p-6 space-y-8 md:overflow-y-auto bg-gradient-to-b from-neutral-950 to-black">
          {/* Winter Card */}
          <WinterCard />
          {/* Header Button Studio */}
          <HeaderButtonStudioCard />
          {/* Stats Grid */}
          <DashboardStatsGrid />
          {/* Industry Slots */}
          <MusicianSlots />
          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-80 bg-neutral-900/50 backdrop-blur-xl border-l border-neutral-800/50 p-6 overflow-y-auto shadow-2xl flex flex-col space-y-8">
          {/* FB Pixel Coming Soon Card */}
          <FBPixelComingSoon />

          {/* The Apothecary Card */}
          <ApothecaryCard />

          {/* Camp Application */}
          <CampApplicationsToggleCard />

          {/* Season Package Banner */}
          <SeasonBannerToggleCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
