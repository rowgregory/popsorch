'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, Plus, Search, X } from 'lucide-react'
import { useAppDispatch } from '@/app/redux/store'
import AdminTitleAndTotal from '@/app/components/admin/AdminTitleAndTotal'
import { useFetchSponsorsQuery } from '@/app/redux/services/sponsorApi'
import CreateBtn from '@/app/components/admin/CreateBtn'
import { setOpenSponsorDrawer } from '@/app/redux/features/sponsorSlice'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import AdminSponsorDrawer from '@/app/drawers/AdminSponsorDrawer'

// Mock data - replace with your actual data source
const mockSponsors = [
  {
    id: '1',
    filename: 'TechCorp Solutions',
    filePath: '/uploads/techcorp-logo.png',
    externalLink: 'https://techcorp.com',
    level: 'platinum',
    color: '#E5E7EB',
    description: 'Leading technology solutions provider specializing in enterprise software and cloud infrastructure.',
    clicks: 1247,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '2',
    filename: 'DataFlow Analytics',
    filePath: '/uploads/dataflow-logo.png',
    externalLink: 'https://dataflow.io',
    level: 'gold',
    color: '#FCD34D',
    description: 'Advanced data analytics and business intelligence platform for modern enterprises.',
    clicks: 892,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-08')
  },
  {
    id: '3',
    filename: 'CloudSync Pro',
    filePath: '/uploads/cloudsync-logo.png',
    externalLink: 'https://cloudsync.pro',
    level: 'silver',
    color: '#10B981',
    description: 'Seamless cloud synchronization and backup solutions for businesses of all sizes.',
    clicks: 634,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: '4',
    filename: 'SecureNet Systems',
    filePath: '/uploads/securenet-logo.png',
    externalLink: 'https://securenet.com',
    level: 'bronze',
    color: '#EF4444',
    description: 'Cybersecurity solutions and network protection services for digital businesses.',
    clicks: 445,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-12')
  },
  {
    id: '5',
    filename: 'InnovateHub',
    filePath: '/uploads/innovatehub-logo.png',
    externalLink: 'https://innovatehub.co',
    level: 'partner',
    color: '#8B5CF6',
    description: 'Innovation platform connecting startups with enterprise partners.',
    clicks: 723,
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '6',
    filename: 'DevTools United',
    filePath: '/uploads/devtools-logo.png',
    externalLink: 'https://devtools.dev',
    level: 'community',
    color: '#F59E0B',
    description: 'Comprehensive development tools and resources for software engineers.',
    clicks: 356,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-18')
  }
]

const sponsorLevels = [
  { value: 'season', label: 'Season Sponsor', color: '#F59E0B', price: '$50,000' },
  { value: 'concert', label: 'Concert Sponsor', color: '#F59E0B', price: '$10,000' },
  { value: 'guest-artist', label: 'Guest Artist Sponsor', color: '#F59E0B', price: '$5,000' },
  { value: 'principal', label: 'Principal', color: '#F59E0B', price: '$1,000' },
  { value: 'associate', label: 'Associate', color: '#F59E0B', price: '$500' },
  { value: 'sustaining', label: 'Sustaining', color: '#F59E0B', price: '$250' }
]

const AdminSponsorsPage = () => {
  const dispatch = useAppDispatch()
  const [sponsors] = useState(mockSponsors)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const { isLoading } = useFetchSponsorsQuery(undefined)
  const [showFilters, setShowFilters] = useState(false)

  // Filter sponsors
  const filteredSponsors = useMemo(() => {
    return sponsors.filter((sponsor) => {
      const matchesSearch =
        sponsor.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsor.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = selectedLevel === 'all' || sponsor.level === selectedLevel
      return matchesSearch && matchesLevel
    })
  }, [sponsors, searchTerm, selectedLevel])

  const sponsorsCount = sponsors.length
  const noSponsors = filteredSponsors.length === 0

  return (
    <div className="relative">
      <AdminSponsorDrawer />
      <div className="flex gap-y-10 760:gap-y-0 flex-col 760:flex-row 760:items-center 760:justify-between mb-8 sticky top-0 z-20 py-2">
        <AdminTitleAndTotal
          title="Sponsors"
          total={sponsorsCount}
          bgcolor="bg-fuchsia-400"
          textcolor="text-fuchsia-400"
          loading={isLoading}
          fillcolor="fill-fuchsia-400"
        />
        <CreateBtn
          btnText="Create Sponsor"
          createFunc={setOpenSponsorDrawer}
          bgColor="bg-fuchsia-400"
          hvbgcolor="bg-fuchsia-500"
        />
      </div>

      {/* Enhanced Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sponsors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || selectedLevel !== 'all'
                ? 'bg-fuchsia-600 border-fuchsia-600 text-white'
                : 'bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {selectedLevel !== 'all' && (
              <span className="bg-fuchsia-800 text-fuchsia-200 px-2 py-0.5 rounded-full text-xs">1</span>
            )}
          </button>
        </div>

        {/* Collapsible Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-900 rounded-lg border border-gray-700 p-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-x-2">
                <label className="text-sm text-gray-300 font-medium">Level:</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white focus:ring-2 focus:ring-fuchsia-500"
                >
                  <option value="all">All Levels</option>
                  {sponsorLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedLevel !== 'all' && (
                <button
                  onClick={() => setSelectedLevel('all')}
                  className="flex items-center gap-x-1 bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-xs text-gray-300 transition-colors"
                >
                  <span>Clear</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <AdminPageSpinner fill="fill-fuchsia-400" />
      ) : noSponsors ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Plus className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {searchTerm || selectedLevel !== 'all' ? 'No sponsors found' : 'No Sponsors'}
            </h3>
            <p className="mb-6">
              {searchTerm || selectedLevel !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first sponsor'}
            </p>
            <button
              onClick={() => dispatch(setOpenSponsorDrawer())}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Sponsor
            </button>
          </div>
        </div>
      ) : (
        filteredSponsors && (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              {/* Header Row */}
              <div className="grid grid-cols-[3fr_2fr_2fr_2fr_1fr] gap-x-4 rounded-md pl-4 py-3 pr-2 mb-3 text-sm min-w-[800px] text-gray-400 font-medium">
                <div className="whitespace-nowrap">Sponsor</div>
                <div className="whitespace-nowrap">Level</div>
                <div className="whitespace-nowrap">Clicks</div>
                <div className="whitespace-nowrap">Created</div>
                <div className="whitespace-nowrap text-right">Actions</div>
              </div>

              {/* Sponsor Rows */}
              <div className="flex flex-col gap-y-3 w-full min-w-[800px]">
                {/* {filteredSponsors.map((sponsor) => (
                    <AdminSponsorRow
                      key={sponsor.id}
                      sponsor={sponsor}
                      onEdit={handleSponsorEdit}
                      onView={handleSponsorView}
                    />
                  ))} */}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default AdminSponsorsPage
