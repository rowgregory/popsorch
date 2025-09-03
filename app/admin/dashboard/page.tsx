'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RootState, useAppSelector } from '@/app/redux/store'
import { dashboardData } from '@/app/utils/admin.utils'
import { useFetchDashboardDataQuery } from '@/app/redux/services/appApi'
import SeasonBannerToggleCard from '@/app/components/admin/dashboard/SeasonBannerToggleCard'
import HeaderButtonStudioCard from '@/app/components/admin/dashboard/HeaderButtonStudioCard'
import HeaderButtonStudio from '@/app/drawers/HeaderButtonStudio'
import { cardColors } from '@/public/data/admin.data'
import PageViewsCard, { cardVariants, containerVariants } from '@/app/components/admin/dashboard/PageViewsCard'
import DefaultCard from '@/app/components/admin/dashboard/DefaultCard'
import CampApplicationsToggleCard from '@/app/components/admin/dashboard/CampApplicationsToggleCard'
import SponsorsCard from '@/app/components/admin/dashboard/SponsorsCard'

const Dashboard = () => {
  const { data, isLoading } = useFetchDashboardDataQuery(undefined) as any
  const { totalItems } = useAppSelector((state: RootState) => state.mailchimp)

  const dataPlusMailchimp = {
    ...data,
    mailchimpMembersCount: totalItems
  }

  return (
    <>
      <HeaderButtonStudio />
      <div className="min-h-screen bg-[#222222] p-6">
        <motion.div className="max-w-[1800px] mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div className="mb-10" variants={cardVariants}>
            <div className="bg-gray-800 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-3">Dashboard Overview</h1>
                  <p className="text-gray-300 text-lg">Monitor your system performance and manage controls</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-green-600">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-300"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-300 animate-ping opacity-75"></div>
                    </div>
                    <span className="text-green-100 font-bold text-sm">SYSTEM ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards Grid - Responsive columns */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <SponsorsCard loading={isLoading} sponsorsCount={data?.sponsorCount} />

            <CampApplicationsToggleCard loading={isLoading} />

            <HeaderButtonStudioCard cardColors={cardColors} cardVariants={cardVariants} />

            {/* Season Package Banner Toggle Card */}
            <SeasonBannerToggleCard loading={isLoading} cardColors={cardColors} cardVariants={cardVariants} />

            {dashboardData(dataPlusMailchimp).map((info, i) => {
              switch (info.title) {
                case 'Page Views':
                  return <PageViewsCard key={i} info={info} getLast7DaysData={data?.getLast7DaysData} />
                default:
                  return <DefaultCard key={i} info={info} i={i} cardIndex={i + 2} />
              }
            })}
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Dashboard
