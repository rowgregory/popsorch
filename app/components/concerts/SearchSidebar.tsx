import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { searchBoxVariants } from '@/app/lib/constants/motion'
import { EyeIcon, FunnelIcon, PlusCircleIcon, Search, SparklesIcon, SunIcon, X } from 'lucide-react'
import getConcertsByType from '@/app/lib/utils/concerts/getConcertsByType'
import { ISearchSidebar } from '@/app/types/entities/concert'

const SearchSidebar: FC<ISearchSidebar> = ({ filterText, setFilterText, filteredConcerts, concerts }) => {
  return (
    <motion.aside
      className="order-1 xl:order-2 col-span-1 xl:col-span-4 2xl:col-span-3"
      variants={searchBoxVariants}
      initial="initial"
      animate="animate"
    >
      <div className="xl:sticky xl:top-24 space-y-6">
        <motion.div
          className="order-2 2xl:order-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-6 md:p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between mb-6">
            <label htmlFor="search" className="text-xl md:text-2xl font-bold text-white">
              Search Concerts
            </label>
            <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <Search className="w-5 h-5 text-amber-500" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative group">
            {/* Glow effect on focus */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />

            <div className="relative">
              <input
                id="search"
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search by name, venue, or city..."
                className="w-full px-4 py-3 pl-12 bg-zinc-800/50 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:bg-zinc-800 transition-all duration-200 text-white placeholder-zinc-500 outline-none"
              />

              {/* Search Icon */}
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-amber-500 transition-colors duration-200" />

              {/* Clear Button */}
              <AnimatePresence>
                {filterText && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setFilterText('')}
                    className="absolute right-3 top-3.5 -translate-y-1/2 p-1 rounded-lg bg-zinc-700/50 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all duration-200"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Search Results Count */}
          <AnimatePresence mode="wait">
            {filterText ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">
                    Found <span className="font-bold text-amber-500">{filteredConcerts.length}</span>{' '}
                    {filteredConcerts.length === 1 ? 'result' : 'results'}
                  </p>
                  {filteredConcerts.length === 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setFilterText('')}
                      className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Clear filter
                    </motion.button>
                  )}
                </div>

                {/* Search breakdown */}
                {filteredConcerts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mt-2 pt-2 border-t border-zinc-800 grid grid-cols-2 gap-2 text-xs"
                  >
                    {getConcertsByType(filteredConcerts, 'concert').length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-zinc-500">
                          {getConcertsByType(filteredConcerts, 'concert').length} concerts
                        </span>
                      </div>
                    )}
                    {getConcertsByType(filteredConcerts, 'add-on').length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span className="text-zinc-500">
                          {getConcertsByType(filteredConcerts, 'add-on').length} add-ons
                        </span>
                      </div>
                    )}
                    {getConcertsByType(filteredConcerts, 'sundays-at-neel').length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-zinc-500">
                          {getConcertsByType(filteredConcerts, 'sundays-at-neel').length} Sundays
                        </span>
                      </div>
                    )}
                    {getConcertsByType(filteredConcerts, 'season').length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-zinc-500">
                          {getConcertsByType(filteredConcerts, 'season').length} season
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              concerts.length > 0 && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/50"
                >
                  <p className="text-xs text-zinc-500 text-center">{concerts.length} events available to search</p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* Optional: Add filter chips or additional filters */}
        <motion.div
          className="order-3 2xl:order-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 pointer-events-none" />

          {/* Header with icon */}
          <div className="relative flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Quick Stats</h3>
            <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>

          {/* Stats grid */}
          <div className="relative space-y-4">
            {/* Add-Ons */}
            <div className="group">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 transition-all duration-300 group-hover:bg-zinc-800/50 group-hover:border-zinc-600/50">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-purple-500/10">
                    <PlusCircleIcon className="w-4 h-4 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400">Add-Ons</span>
                </div>
                <motion.span
                  className="text-xl font-bold text-white"
                  key={`addon-${filteredConcerts.length}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                >
                  {getConcertsByType(filteredConcerts, 'add-on').length}
                </motion.span>
              </div>
            </div>

            {/* Sundays at Neel */}
            <div className="group">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 transition-all duration-300 group-hover:bg-zinc-800/50 group-hover:border-zinc-600/50">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-blue-500/10">
                    <SunIcon className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400">Sundays at Neel</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="text-xl font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                  >
                    {getConcertsByType(filteredConcerts, 'sundays-at-neel').length}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Season */}
            <div className="group">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/30 transition-all duration-300 group-hover:bg-zinc-800/50 group-hover:border-zinc-600/50">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-green-500/10">
                    <SparklesIcon className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-zinc-400">Season</span>
                </div>
                <motion.span
                  className="text-xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                >
                  {getConcertsByType(filteredConcerts, 'season').length}
                </motion.span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-4" />

            {/* Summary row */}
            <div className="group">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-amber-500/20 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20">
                    <EyeIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-sm font-bold text-amber-400">Total Showing</span>
                </div>
                <motion.span
                  className="text-2xl font-bold text-amber-400"
                  key={`total-${filteredConcerts.length}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
                >
                  {filteredConcerts.length}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Filter indicator */}
          {filterText && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              <p className="text-xs text-amber-400 text-center flex items-center justify-center gap-1">
                <FunnelIcon className="w-3 h-3" />
                Filtered results active
              </p>
            </motion.div>
          )}

          {/* On Sale indicator */}
          {filteredConcerts.filter((c: { isOnSale: any }) => c.isOnSale).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-3 flex items-center justify-center gap-2 text-xs text-green-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {filteredConcerts.filter((c: { isOnSale: any }) => c.isOnSale).length} on sale now
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  )
}

export default SearchSidebar
