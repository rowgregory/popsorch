'use client'

import { useState, useTransition } from 'react'
import { setOpenConcertDrawer } from '@/app/redux/features/concertSlice'
import { motion } from 'framer-motion'
import { IConcert } from '@/app/types/entities/concert'
import { Edit2, ExternalLink, Loader2, Trash2, X } from 'lucide-react'
import EmptyState from '@/app/components/common/EmptyState'
import { getConcertStatusOptions } from '@/app/lib/utils/concerts/getConcertStatusOptions'
import { getConcertStatusColor } from '@/app/lib/utils/concerts/getConcertStatusColor'
import { setInputs } from '@/app/redux/features/formSlice'
import { useAppDispatch } from '@/app/redux/store'
import { formatDateShort } from '@/app/lib/utils/dateUtils'
import { toggleConcertOnSale } from '@/app/actions/toggleConcertOnSale'
import { useRouter } from 'next/navigation'
import { showToast } from '@/app/redux/features/toastSlice'
import Switch from '@/app/components/forms/elements/Switch'
import { deleteConcert } from '@/app/actions/deleteConcert'

const AdminConcerts = ({ data }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const concerts = data?.concerts

  const handleEditConcert = (concert: IConcert) => {
    dispatch(setOpenConcertDrawer())
    dispatch(setInputs({ formName: 'concertForm', data: { ...concert, isUpdating: true } }))
  }

  const handleDelete = async (concertId: string) => {
    setDeletingId(concertId)
    startTransition(async () => {
      try {
        await deleteConcert(concertId)
        router.refresh()
        dispatch(
          showToast({
            message: 'Concert deleted successfully',
            type: 'success'
          })
        )
      } catch {
        dispatch(
          showToast({
            message: 'Failed to delete concert',
            type: 'error'
          })
        )
      } finally {
        setDeletingId(null)
      }
    })
  }

  const handleToggleOnSale = async (concert: IConcert) => {
    startTransition(async () => {
      try {
        await toggleConcertOnSale(concert.id, !concert.isOnSale)
        router.refresh()
        dispatch(
          showToast({
            message: `Concert is ${!concert.isOnSale ? 'on sale' : 'not on sale'}`,
            type: 'success'
          })
        )
      } catch {
        dispatch(
          showToast({
            message: 'Failed to update concert',
            type: 'error'
          })
        )
      }
    })
  }

  return (
    <div className="h-[calc(100vh-66px)] p-6">
      {/* Stats Cards - Mobile */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {getConcertStatusOptions(concerts).map((concert) => (
          <motion.div
            key={concert.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/50 p-4 rounded-xl shadow-sm border border-neutral-800"
          >
            <div className="flex flex-col items-center">
              <p className="text-xs text-neutral-400 mb-1">{concert.label}</p>
              <p className="text-xl font-bold text-white">{concert.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Concerts Table */}
      <div className="bg-neutral-900/50 rounded-xl shadow-sm border border-neutral-800 overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-semibold text-white">All Concerts</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Concert
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  Is On Sale
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
              {concerts?.map((concert: IConcert, index: number) => (
                <motion.tr
                  key={concert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-white">{concert.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        getConcertStatusColor[concert.type] || 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {concert.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      enabled={concert.isOnSale}
                      onChange={() => handleToggleOnSale(concert)}
                      isLoading={isPending}
                      name="isOnSale"
                      color="bg-sunburst"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-400">{formatDateShort(concert.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <a
                        href={concert.allSeriesExternalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-400 hover:text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                        title="Visit Website"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleEditConcert(concert)}
                        className="p-2 text-neutral-400 hover:text-yellow-400 hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(concert.id)}
                        disabled={deletingId === concert.id}
                        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 text-neutral-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        {deletingId === concert.id ? (
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

      {/* Empty State (if no concerts) */}
      {data?.noConcerts && (
        <EmptyState
          searchQuery=""
          typeFilter=""
          title="Concert"
          advice="Add your first concert to get started"
          func={setOpenConcertDrawer}
          action="Add Concert"
        />
      )}
    </div>
  )
}

export default AdminConcerts
