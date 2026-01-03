'use client'

import { useState, useTransition } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import { setOpenVenueDrawer } from '@/app/redux/features/venueSlice'
import { setInputs } from '@/app/redux/features/formSlice'
import { motion } from 'framer-motion'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import EmptyState from '@/app/components/common/EmptyState'
import { useRouter } from 'next/navigation'
import { deleteVenue } from '@/app/actions/deleteVenue'
import { showToast } from '@/app/redux/features/toastSlice'
import { IVenue } from '@/app/types/entities/venue'

const AdminVenues = ({ data }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [_, startTransition] = useTransition()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const venues = data?.venues
  const totalVenues = venues?.count

  const handleEditVenue = (venue: IVenue) => {
    dispatch(setOpenVenueDrawer())
    dispatch(setInputs({ formName: 'venueForm', data: { ...venue, isUpdating: true } }))
  }

  const handleDelete = async (venueId: string) => {
    setDeletingId(venueId)
    startTransition(async () => {
      try {
        await deleteVenue(venueId)
        router.refresh()
        dispatch(
          showToast({
            message: 'Venue deleted successfully',
            type: 'success'
          })
        )
      } catch {
        dispatch(
          showToast({
            message: 'Failed to delete venue',
            type: 'error'
          })
        )
      } finally {
        setDeletingId(null)
      }
    })
  }

  return (
    <div className="h-[calc(100vh-66px)] p-6">
      {/* Stats Card - Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800 mb-6"
      >
        <div className="flex items-center">
          <p className="text-xs text-neutral-400 mb-1">Total Venues</p>
          <p className="text-xl font-bold text-white">{totalVenues}</p>
        </div>
      </motion.div>

      {/* Venues Table */}
      <div className="bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">All Venues</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Venue Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Parking
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-neutral-900/50 divide-y divide-neutral-800">
              {venues?.map((venue: IVenue, index: number) => (
                <motion.tr
                  key={venue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">{venue.name}</p>
                      <p className="text-xs text-neutral-400">{venue.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-300">{venue.parking}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-400">
                      {venue.capacity ? `${venue.capacity.toLocaleString()}` : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-400">{venue.parking || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-400">{formatDateShort(venue.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditVenue(venue)}
                        className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(venue.id)}
                        disabled={deletingId === venue.id}
                        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        {deletingId === venue.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State - Mobile */}
      {data?.noVenues && (
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
  )
}
export default AdminVenues
