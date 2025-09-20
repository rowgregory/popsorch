'use client'

import React from 'react'
import AdminConcertCard from '@/app/components/admin/AdminConcertCard'
import AdminPageSpinner from '@/app/components/admin/AdminPageSpinner'
import { ConcertProps, setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { motion } from 'framer-motion'
import { Music2, Plus, PlusCircle, Rotate3d, Theater } from 'lucide-react'
import { useFetchConcertsQuery } from '@/app/redux/services/concertApi'
import { useAppDispatch } from '@/app/redux/store'

const Concerts = () => {
  const { data, isLoading } = useFetchConcertsQuery(undefined) as {
    data: { concerts: ConcertProps[] }
    isLoading: boolean
  }
  const concerts = data?.concerts

  const dispatch = useAppDispatch()

  const concertCounts = concerts?.reduce(
    (acc, concert) => {
      if (concert.type === 'season') acc.season++
      if (concert.type === 'add-on') acc.addOn++
      if (concert.type === 'sundays-at-neel') acc.sundaysAtNeel++

      return acc
    },
    { season: 0, addOn: 0, sundaysAtNeel: 0 }
  ) || { season: 0, addOn: 0, sundaysAtNeel: 0 }

  const { season, addOn, sundaysAtNeel } = concertCounts

  const totalConcerts = concerts?.length || 0
  const noConcerts = totalConcerts === 0

  return (
    <>
      <div className="h-[calc(100dvh-68px)] p-6">
        <div className="w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-6 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/50 p-6 rounded-xl shadow-sm border border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-900/50 rounded-lg">
                  <Music2 className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Total Concerts</p>
                  <p className="text-2xl font-bold text-white">{totalConcerts}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-900/50 p-6 rounded-xl shadow-sm border border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-900/50 rounded-lg">
                  <Rotate3d className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Season</p>
                  <p className="text-2xl font-bold text-white">{season}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-900/50 p-6 rounded-xl shadow-sm border border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-900/50 rounded-lg">
                  <PlusCircle className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Add On</p>
                  <p className="text-2xl font-bold text-white">{addOn}</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-neutral-900/50 p-6 rounded-xl shadow-sm border border-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-900/50 rounded-lg">
                  <Theater className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Sundays @ Neel</p>
                  <p className="text-2xl font-bold text-white">{sundaysAtNeel}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {isLoading ? (
            <AdminPageSpinner fill="fill-pink-400" />
          ) : (
            <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-y-4 md:gap-4">
              {concerts?.map((concert: ConcertProps) => (
                <AdminConcertCard key={concert.id} concert={concert} />
              ))}
            </div>
          )}

          {/* Empty State (if no concerts) */}
          {noConcerts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 rounded-xl shadow-sm border border-neutral-800 p-12 text-center"
            >
              <Music2 className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No concerts yet</h3>
              <p className="text-neutral-400 mb-6">Get started by adding your first concert</p>
              <button
                onClick={() => dispatch(setOpenConcertDrawer())}
                className="inline-flex items-center gap-2 border-2 border-neutral-600 hover:bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Your First Concert
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default Concerts
