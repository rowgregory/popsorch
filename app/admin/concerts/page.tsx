'use client'

import React, { useState } from 'react'
import AdminConcertCard from '@/app/components/admin/AdminConcertCard'
import { setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { AnimatePresence, motion } from 'framer-motion'
import { useConcertSelector } from '@/app/redux/store'
import { IConcert } from '@/app/types/entities/concert'
import { Search } from 'lucide-react'
import EmptyState from '@/app/components/common/EmptyState'

const getConcertStatusOptions = (concerts: IConcert[]) => [
  { value: 'all', label: 'All Status', count: concerts?.length },
  { value: 'Season', label: 'Season', count: concerts?.filter((f) => f.type === 'Season').length },
  { value: 'Add-On', label: 'Add On', count: concerts?.filter((f) => f.type === 'Add-On').length },
  {
    value: 'Sundays-at-Neel',
    label: 'Sundays@Neel',
    count: concerts?.filter((f) => f.type === 'Sundays-at-Neel').length
  }
]

const getParleyStatusColor = (status: string) => {
  switch (status) {
    case 'all':
      return 'text-red-400 bg-red-400 border-red-400/20'
    case 'Season':
      return 'text-orange-400 bg-orange-400 border-orange-400/20'
    case 'Add-On':
      return 'text-yellow-400 bg-yellow-400 border-yellow-400/20'
    default:
      return 'text-green-400 bg-green-400 border-green-400/20'
  }
}

const Concerts = () => {
  const { concerts } = useConcertSelector()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const totalConcerts = concerts?.length || 0
  const noConcerts = totalConcerts === 0

  const filteredConcerts = concerts?.filter((concert) => {
    const matchesSearch = searchQuery === '' || concert.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || concert.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <div className="flex h-[calc(100vh-66px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-6 overflow-y-auto space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getConcertStatusOptions(concerts).map((status, index) => (
            <motion.div
              key={status.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-400 text-sm">{status.label}</p>
                  <p className="text-2xl font-bold text-white">{status.count}</p>
                </div>
                <div className={`p-1 rounded-full ${getParleyStatusColor(status.value)}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="sticky top-0 z-20 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by member name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:ring-2 focus:ring-blaze focus:border-blaze transition-all focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blaze focus:border-blaze transition-all"
            >
              <option value="all">All Types</option>
              <option value="Season">Season</option>
              <option value="Sundays-at-Neel">Sundays@Neel</option>
              <option value="Add-On">Add On</option>
            </select>
          </div>
        </div>

        {/* Concert List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-7">
          <AnimatePresence>
            {filteredConcerts?.map((concert, index) => (
              <AdminConcertCard key={index} concert={concert} />
            ))}
          </AnimatePresence>
        </div>
        {/* Empty State */}
        {noConcerts && (
          <EmptyState
            searchQuery={searchQuery}
            typeFilter={typeFilter}
            title="Concert"
            advice="Schedule your first concert to get started"
            func={setOpenConcertDrawer}
            action="Create Concert"
          />
        )}
      </motion.div>
    </div>
  )
}

export default Concerts
