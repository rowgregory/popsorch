import { useTeamMemberSelector } from '@/app/redux/store'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, Music } from 'lucide-react'

const MusicianSlots = () => {
  const { musicians } = useTeamMemberSelector()
  const [sortBy, setSortBy] = useState<'displayOrder' | 'position' | 'firstName'>('displayOrder')

  // Get total musician count and filled count
  const totalMusicians = musicians?.length || 0
  const filledSlots = musicians?.filter((musician) => musician.firstName && musician.lastName)?.length || 0
  const capacityPercent = totalMusicians > 0 ? Math.round((filledSlots / totalMusicians) * 100) : 0

  const sortedMusicians = useMemo(() => {
    if (!musicians) return []

    return [...musicians].sort((a, b) => {
      if (sortBy === 'displayOrder') {
        const orderA = a.displayOrder ?? 999999
        const orderB = b.displayOrder ?? 999999
        return orderA - orderB
      } else if (sortBy === 'position') {
        const posA = a.position || ''
        const posB = b.position || ''
        return posA.localeCompare(posB)
      } else {
        const nameA = a.firstName || ''
        const nameB = b.firstName || ''
        return nameA.localeCompare(nameB)
      }
    })
  }, [musicians, sortBy])

  const getNextSortBy = () => {
    if (sortBy === 'displayOrder') return 'position'
    if (sortBy === 'position') return 'firstName'
    return 'displayOrder'
  }

  const getSortLabel = () => {
    if (sortBy === 'displayOrder') return 'Position'
    if (sortBy === 'position') return 'Name'
    return 'Order'
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-neutral-900 to-black border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700/70 transition-all duration-300 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Musician Roster</h3>
          <span className="text-sm text-neutral-400">Orchestra Members</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSortBy(getNextSortBy())}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 bg-neutral-700 text-white border border-neutral-600 hover:bg-neutral-600"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort by {getSortLabel()}</span>
          </button>
          <div className="text-sm text-neutral-400">
            {filledSlots} of {totalMusicians} filled
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedMusicians?.map((musician, index) => (
          <motion.div
            key={musician.id || index}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg hover:bg-neutral-800/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div>
                <span className="font-medium text-white">{musician.position || 'Unknown Position'}</span>
              </div>
            </div>
            <div className="text-right flex items-center space-x-2">
              <Music className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-400 text-sm font-medium">
                {musician.firstName && musician.lastName ? `${musician.firstName} ${musician.lastName}` : 'Available'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-neutral-800/30 rounded-lg h-2">
        <div
          className="bg-gradient-to-r from-neutral-600 to-neutral-500 h-2 rounded-lg transition-all duration-300"
          style={{ width: `${capacityPercent}%` }}
        ></div>
      </div>
      <p className="text-neutral-400 text-sm mt-2">
        Filled Slots: {filledSlots}/{totalMusicians} ({capacityPercent}%)
      </p>
    </motion.div>
  )
}

export default MusicianSlots
