'use client'

import { useState } from 'react'
import { useAppDispatch, useVenueSelector } from '@/app/redux/store'
import { VenueProps } from '@/app/types/model.types'
import { useDeleteVenueMutation } from '@/app/redux/services/venueApi'
import { removeVenueFromState, setOpenVenueDrawer } from '@/app/redux/features/venueSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import { motion } from 'framer-motion'
import { Edit2, Theater, Trash2 } from 'lucide-react'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import EmptyState from '@/app/components/common/EmptyState'

const Venues = () => {
  const dispatch = useAppDispatch()
  const { venues, noVenues } = useVenueSelector()
  const [deleteVenue] = useDeleteVenueMutation()
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({})

  const totalVenues = venues?.length

  const handleEditVenue = (venue: VenueProps) => {
    dispatch(setOpenVenueDrawer())
    dispatch(setInputs({ formName: 'venueForm', data: { ...venue, isUpdating: true } }))
  }

  const handleDeleteVenue = async (id: string) => {
    setIsLoading({ [id]: true })
    const response = await deleteVenue({ id }).unwrap()
    dispatch(removeVenueFromState(response.id))
    setIsLoading({ [id]: false })
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Stats Card - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-lg">
              <Theater className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total Venues</p>
              <p className="text-xl font-bold text-white">{totalVenues}</p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Venue Cards */}
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {venues?.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 hover:border-neutral-600/60 transition-all"
            >
              {/* Venue Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-100 font-semibold text-base leading-tight mb-1 truncate">
                      {venue.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">Capacity: {venue.capacity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => handleEditVenue(venue)}
                    className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </button>
                  {isLoading[venue.id] ? (
                    <div className="w-3 h-3 border-2 border-red-500 border-t-0 animate-spin rounded-full" />
                  ) : (
                    <button
                      onClick={() => handleDeleteVenue(venue.id)}
                      className="p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Venue Details */}
              <div className="space-y-2">
                <div className="p-3 bg-neutral-800/40 rounded-lg">
                  <div className="text-neutral-200 font-medium text-sm mb-1">Address</div>
                  <div className="text-neutral-400 text-sm">{venue.address}</div>
                </div>

                <div className="p-3 bg-neutral-800/40 rounded-lg">
                  <div className="text-neutral-200 font-medium text-sm mb-1">Created</div>
                  <div className="text-neutral-400 text-sm">{formatDateShort(venue.createdAt)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State - Mobile */}
        {noVenues && (
          <EmptyState
            searchQuery=""
            typeFilter="all"
            title="venue"
            advice="Add your first venue to get started"
            func={setOpenVenueDrawer}
            action="Add Venue"
          />
        )}
      </div>
    </div>
  )
}
export default Venues
