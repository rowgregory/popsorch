'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch, useMailchimpSelector } from '@/app/redux/store'
import { dashboardData } from '@/app/utils/admin.utils'
import { useFetchDashboardDataQuery } from '@/app/redux/services/appApi'
import SeasonBannerToggleCard from '@/app/components/admin/dashboard/SeasonBannerToggleCard'
import HeaderButtonStudio from '@/app/drawers/HeaderButtonStudio'
import PageViewsCard, { containerVariants } from '@/app/components/admin/dashboard/PageViewsCard'
import DefaultCard from '@/app/components/admin/dashboard/DefaultCard'
import CampApplicationsToggleCard from '@/app/components/admin/dashboard/CampApplicationsToggleCard'
import { AlertTriangle, Calendar, ChevronRight, Edit3, MessageCircle, MoreHorizontal, Palette } from 'lucide-react'
import { setOpeneHeaderButtonStudio } from '@/app/redux/features/appSlice'

const Dashboard = () => {
  const { data } = useFetchDashboardDataQuery(undefined) as any
  const { totalItems } = useMailchimpSelector()
  const dispatch = useAppDispatch()

  return (
    <div className="bg-neutral-950">
      {/* Main Layout */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">
        <div className="flex-1 p-6 md:overflow-y-auto">
          <HeaderButtonStudio />
          <div className="min-h-screen">
            <motion.div className="mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
              {/* Cards Grid - Responsive columns */}
              <motion.div
                className="md:grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-6"
                variants={containerVariants}
              >
                {/* Header Button Studio Card - Full Width */}
                <div className="col-span-4">
                  <div className="bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-indigo-900/30 border border-indigo-500/30 rounded-xl p-6 hover:border-indigo-400/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Palette className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">Header Button Studio</h3>
                          <p className="text-indigo-300 text-sm">Design and customize interface elements</p>
                        </div>
                      </div>

                      <button
                        onClick={() => dispatch(setOpeneHeaderButtonStudio())}
                        className="mt-3 md:mt-0 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 hover:border-indigo-400/50 rounded-lg px-6 py-3 text-indigo-300 font-medium transition-all flex items-center space-x-2"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Open Studio</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-slate-400 text-sm">Active Components</div>
                      </div>
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-400 mb-1">3</div>
                        <div className="text-slate-400 text-sm">Templates</div>
                      </div>
                      <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">2h</div>
                        <div className="text-slate-400 text-sm">Last Modified</div>
                      </div>
                    </div>
                  </div>
                </div>

                {dashboardData(data).map((info, i) => {
                  switch (info.title) {
                    default:
                      return <DefaultCard key={i} info={info} i={i} />
                  }
                })}
                <CampApplicationsToggleCard />

                {/* Season Package Banner Toggle Card */}
                <SeasonBannerToggleCard />

                <PageViewsCard info={data} getLast7DaysData={data?.getLast7DaysData} />
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Right Sidebar */}
        <div className="block w-full md:w-80 bg-gray-800/30 border-l border-gray-700/50 p-6 overflow-y-auto">
          {/* Sponsors*/}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center">
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Sponsors
                </span>
              </h3>
              <MoreHorizontal className="text-gray-400 text-sm font-medium" />
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{data?.sponsorCount}</div>
              <div className="text-green-400 text-sm font-medium">Total Sponosors</div>
            </div>
          </div>

          {/* Concerts */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Concerts
                </span>
              </h3>
              <MoreHorizontal className="text-gray-400 text-sm font-medium" />
            </div>
            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{data?.concertsCount}</div>
              <div className="text-indigo-400 text-sm font-medium">Total Concerts</div>
            </div>
          </div>

          {/* Team Members Info */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center">
                <span className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                  Team Members
                </span>
              </h3>
              <MoreHorizontal className="text-gray-400 text-sm font-medium" />
            </div>
            <div className="bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{data?.teamMembersCount}</div>
              <div className="text-fuchsia-400 text-sm font-medium">Total Board & Staff</div>
            </div>
          </div>

          {/* Mailchimp Info */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center">
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  Mailchimp
                </span>
                <span className="ml-1">Members</span>
              </h3>
              <MoreHorizontal className="text-gray-400 text-sm font-medium" />
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{totalItems}</div>
              <div className="text-orange-400 text-sm font-medium">Total Subscribers</div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-white font-semibold text-sm">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  title: 'Signal First Chair',
                  description: 'Direct message to Sqysh',
                  icon: MessageCircle,
                  color: 'blue',
                  action: () => {
                    /* Handle message to Sqysh */
                  }
                },
                {
                  id: 2,
                  title: 'Report Discord',
                  description: 'Report technical issues',
                  icon: AlertTriangle,
                  color: 'red',
                  action: () => {
                    /* Handle bug report */
                  }
                },
                {
                  id: 3,
                  title: 'Request Rehearsal',
                  description: 'Schedule practice session',
                  icon: Calendar,
                  color: 'purple',
                  action: () => {
                    /* Handle rehearsal request */
                  }
                }
              ].map((button) => (
                <button
                  key={button.id}
                  onClick={button.action}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/40 hover:bg-slate-700/50 border border-slate-600/30 hover:border-slate-500/50 rounded-lg transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-${button.color}-500/20 rounded-lg flex items-center justify-center`}>
                      <button.icon className={`w-4 h-4 text-${button.color}-400`} />
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">{button.title}</div>
                      <div className="text-slate-400 text-xs">{button.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
